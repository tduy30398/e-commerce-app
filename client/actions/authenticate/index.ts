import { setAccessTokenHeader } from '@/lib/axios';
import useProfileStore from '@/store/useProfileStore';
import useCartStore from '@/store/useCartStore';

export const logoutUserService = () => {
  setAccessTokenHeader(null);
  useProfileStore.getState().clearAuth();
  useCartStore.getState().clearCart();
};
