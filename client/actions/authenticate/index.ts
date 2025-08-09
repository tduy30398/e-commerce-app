import { setAccessTokenHeader } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import useProfileStore from '@/store/useProfileStore';

export const logoutUserService = () => {
  setAccessTokenHeader(null);
  useAuthStore.getState().clearAccessToken();
  useProfileStore.getState().clearProfileData();
  window.location.href = '/';
};
