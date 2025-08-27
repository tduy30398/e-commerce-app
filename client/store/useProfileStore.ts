import { UserProfile } from '@/actions/authenticate/type';
import { STORAGE } from '@/lib/constants';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ProfileState {
  profileData: UserProfile | null;
  accessToken: string | null;
  isLoggingOut: boolean;
  hydrated: boolean;
  setProfileData: (profileData: UserProfile) => void;
  setAccessToken: (token: string) => void;
  setAuth: (profileData: UserProfile, token: string) => void;
  clearAuth: () => void;
  finishLogout: () => void;
  setHydrated: () => void;
}

const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set) => ({
        profileData: null,
        accessToken: null,
        isLoggingOut: false,
        hydrated: false,

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
        setHydrated: () => set({ hydrated: true }),
      }),
      {
        name: STORAGE.PROFILE,
        onRehydrateStorage: () => (state) => {
          state?.setHydrated();
        },
      }
    ),
    { name: STORAGE.PROFILE }
  )
);

export default useProfileStore;
