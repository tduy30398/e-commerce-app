import { UserProfile } from '@/actions/authenticate/type';
import { STORAGE } from '@/lib/constants';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ProfileState {
  profileData: UserProfile | null;
  setProfileData: (profileData: UserProfile) => void;
  clearProfileData: () => void;
}

const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set) => ({
        profileData: null,
        setProfileData: (profileData) => set({ profileData }),
        clearProfileData: () => set({ profileData: null }),
      }),
      {
        name: STORAGE.PROFILE,
      }
    ),
    {
      name: STORAGE.PROFILE,
    }
  )
);

export default useProfileStore;
