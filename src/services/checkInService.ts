import { supabase } from '../lib/supabase';

export class CheckInService {
  /**
   * Check in a volunteer for a specific slot
   */
  static async checkInVolunteer(slotId: string, email: string, name: string | null) {
    // First verify the slot exists and is active
    const { data: slot, error: slotError } = await supabase
      .from('slot_details')
      .select('*')
      .eq('id', slotId)
      .single();

    if (slotError) throw new Error('Invalid slot');
    if (!slot) throw new Error('Slot not found');

    // Find or create volunteer
    const { data: volunteer, error: volunteerError } = await supabase
      .from('volunteers')
      .upsert([{
        email: email.toLowerCase(),
        name: name || null
      }], {
        onConflict: 'email',
        ignoreDuplicates: false
      })
      .select('id')
      .single();

    if (volunteerError) throw new Error('Failed to process volunteer');

    // Verify slot assignment
    const { data: slotVolunteer, error: verifyError } = await supabase
      .from('slot_volunteers')
      .select('checked_in')
      .eq('slot_id', slotId)
      .eq('volunteer_id', volunteer.id)
      .single();

    if (verifyError || !slotVolunteer) {
      throw new Error('No registration found for this email address');
    }

    if (slotVolunteer.checked_in) {
      throw new Error('You have already checked in for this slot');
    }

    // Update check-in status
    const { error: updateError } = await supabase
      .from('slot_volunteers')
      .update({ 
        checked_in: true,
        check_in_time: new Date().toISOString()
      })
      .eq('slot_id', slotId)
      .eq('volunteer_id', volunteer.id);

    if (updateError) throw new Error('Failed to update check-in status');

    return true;
  }

  /**
   * Get pending volunteers for a slot
   */
  static async getPendingVolunteers(slotId: string) {
    const { data, error } = await supabase
      .from('slot_details')
      .select('volunteer_list')
      .eq('id', slotId)
      .single();

    if (error) throw new Error('Failed to fetch volunteers');

    return (data?.volunteer_list || []).filter(v => !v.checked_in);
  }
}