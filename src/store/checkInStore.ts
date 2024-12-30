import { create } from 'zustand';
import { CheckInService } from '../services/checkInService';

interface CheckInState {
  loading: boolean;
  error: string | null;
  checkIn: (slotId: string, email: string, name: string) => Promise<void>;
}

export const useCheckInStore = create<CheckInState>((set) => ({
  loading: false,
  error: null,

  checkIn: async (slotId: string, email: string, name: string) => {
    set({ loading: true, error: null });
    try {
      await CheckInService.checkInVolunteer(slotId, email, name);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to check in';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  }
}));