import { localPersist } from '@/utils/recoilLocalPersist';
import { atom } from 'recoil';
import { CartItem } from '@/types';

export const cartState = atom<CartItem[]>({
    key: 'cartState',
    default: [] as CartItem[],
    effects: [localPersist]
});
