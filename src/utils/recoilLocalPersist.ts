import { AtomEffect } from 'recoil';
import { CartItem } from '@/types';

export const localPersist: AtomEffect<CartItem[]> = ({ onSet, setSelf, node }) => {
    const storedData = localStorage.getItem(node.key);
    if (storedData) {
        setSelf(JSON.parse(storedData));
    }
    onSet((newData: CartItem[], _, isReset: boolean) => {
        isReset ? localStorage.removeItem(node.key) : localStorage.setItem(node.key, JSON.stringify(newData));
    });
};
