import { setAccessTokenHeader } from '@/lib/axios';
import useProfileStore from '@/store/useProfileStore';

export const logoutUserService = () => {
  setAccessTokenHeader(null);
  useProfileStore.getState().clearAuth();
};
