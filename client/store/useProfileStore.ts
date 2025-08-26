import { UserProfile } from '@/actions/authenticate/type';
import { STORAGE } from '@/lib/constants';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ProfileState {
  profileData: UserProfile | null;
  accessToken: string | null;
  isLoggingOut: boolean;
  setProfileData: (profileData: UserProfile) => void;
  setAccessToken: (token: string) => void;
  setAuth: (profileData: UserProfile, token: string) => void;
  clearAuth: () => void;
  finishLogout: () => void;
}

const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set) => ({
        profileData: null,
        accessToken: null,
        isLoggingOut: false,

        setProfileData: (profileData) => set({ profileData }),
        setAccessToken: (token) => set({ accessToken: token }),

        setAuth: (profileData, token) =>
          set({ profileData, accessToken: token, isLoggingOut: false }),

        clearAuth: () =>
          set({
            profileData: null,
            accessToken: null,
            isLoggingOut: true,
          }),

        finishLogout: () => set({ isLoggingOut: false }),
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
