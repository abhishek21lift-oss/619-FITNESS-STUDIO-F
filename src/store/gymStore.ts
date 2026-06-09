import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GymState {
  settings: any;
  members: any[];
  staff: any[];
  notifications: any[];
  setSettings: (settings: any) => void;
  setMembers: (members: any[]) => void;
  setStaff: (staff: any[]) => void;
  setNotifications: (notifications: any[]) => void;
}

export const useGymStore = create<GymState>()(
  persist(
    (set) => ({
      settings: {},
      members: [],
      staff: [],
      notifications: [],
      setSettings: (settings) => set({ settings }),
      setMembers: (members) => set({ members }),
      setStaff: (staff) => set({ staff }),
      setNotifications: (notifications) => set({ notifications }),
    }),
    {
      name: 'gym-storage',
    }
  )
);
