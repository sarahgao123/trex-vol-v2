import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCheckInStore } from '../store/checkInStore';
import type { SlotWithVolunteers } from '../types/slot';
import { isTimeSlotActive } from '../utils/dateUtils';

export function useCheckIn(positionId: string | undefined, slotId: string | null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slot, setSlot] = useState<SlotWithVolunteers | null>(null);
  const { checkIn } = useCheckInStore();

  useEffect(() => {
    async function fetchSlotDetails() {
      setLoading(true);
      setError(null);

      try {
        if (!positionId) {
          throw new Error('Position ID is required');
        }

        let query = supabase
          .from('slot_details')
          .select('*');

        if (slotId) {
          query = query.eq('id', slotId);
        } else {
          const now = new Date().toISOString();
          query = query
            .eq('position_id', positionId)
            .lte('start_time', now)
            .gte('end_time', now);
        }

        const { data, error: slotError } = await query.maybeSingle();

        if (slotError) throw slotError;
        if (!data) throw new Error('No active time slot found for check-in');

        // Verify slot is active if times are set
        if (data.start_time && data.end_time && !isTimeSlotActive(data.start_time, data.end_time)) {
          throw new Error('This time slot is not currently active');
        }

        setSlot(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load slot details');
      } finally {
        setLoading(false);
      }
    }

    fetchSlotDetails();
  }, [positionId, slotId]);

  const handleCheckIn = async (email: string, name: string) => {
    if (!slot) {
      throw new Error('No active slot found');
    }

    await checkIn(slot.id, email, name);
    
    // Refresh slot data after check-in
    const { data: updatedSlot } = await supabase
      .from('slot_details')
      .select('*')
      .eq('id', slot.id)
      .single();

    if (updatedSlot) {
      setSlot(updatedSlot);
    }
  };

  return {
    slot,
    loading,
    error,
    handleCheckIn
  };
}