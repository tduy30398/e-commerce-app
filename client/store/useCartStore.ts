import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { STORAGE } from '@/lib/constants';
import { Cart } from '@/components/organisms/RightHeader';

interface CartState {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  devtools(
    (set) => ({
      cart: null,

      setCart: (cart) => set({ cart }),

      clearCart: () => set({ cart: null }),
    }),
    {
      name: STORAGE.CART,
    }
  )
);

export default useCartStore;
