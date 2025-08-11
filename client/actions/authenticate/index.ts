import { setAccessTokenHeader } from '@/lib/axios';
import { ROUTES } from '@/lib/constants';
import useProfileStore from '@/store/useProfileStore';

export const logoutUserService = () => {
  setAccessTokenHeader(null);
  useProfileStore.getState().clearAuth();
  window.location.href = ROUTES.HOME;
};
