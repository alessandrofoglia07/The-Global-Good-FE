import React, { useEffect, useState, useContext } from 'react';
import Logo from './Logo';
import { LuUser2 as UserIcon, LuSearch as SearchIcon, LuShoppingCart as CartIcon } from 'react-icons/lu';
import { IoClose as XIcon } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { cartState } from '@/store/cart';
import axios from '@/api/axios';
import { CartItem, Product, ProductWithQuantity } from '@/types';
import MinimizedProductCard from './MinimizedProductCard';
import { AccountContext } from '@/context/Account';
import Spinner from './Spinner';

const Navbar: React.FC = () => {
    const { getSession } = useContext(AccountContext)!;

    const [state, setState] = useState<'loading' | 'loggedIn' | 'guest'>('loading');
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useRecoilState(cartState);
    const [cartProducts, setCartProducts] = useState<ProductWithQuantity[]>([]);
    const [suggestedProducts, setSuggestedProducts] = useState<ProductWithQuantity[]>([]);

    const controlNavbar = () => {
        if (lastScrollY === 0) {
            setShow(true);
            return setLastScrollY(window.scrollY);
        }
        if (window.scrollY > lastScrollY && window.scrollY > 80) setShow(false);
        else setShow(true);
        setLastScrollY(window.scrollY);
    };

    const handleCartClose = () => {
        const cartMenu = document.getElementById('cart-menu');
        if (cartMenu) cartMenu.classList.add('animate-slide-out');
        setTimeout(() => {
            setCartOpen(false);
        }, 300);
    };

    useEffect(() => {
        getSession()
            .then((session) => {
                if (session) setState('loggedIn');
                else setState('guest');
            })
            .catch(() => setState('guest'));
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('#cart-menu') && !target.closest('button[aria-label="cart-button"]') && !target.closest('button[aria-label="remove-from-cart-btn"]')) {
                handleCartClose();
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const handleSearch = () => {
        // TODO: implement search
        console.log('search');
    };

    const handleUpdateCart = (product: ProductWithQuantity, quantity: number) => {
        if (quantity === 0) {
            setCartProducts((prev) => prev.filter((item) => item.name !== product.name));
            return;
        }
        setCartProducts((prev) =>
            prev.map((item) => {
                if (item.name === product.name) return { ...item, quantity };
                return item;
            })
        );
    };

    const fetchProductsData = async (newCartItem?: CartItem) => {
        if (!cartItems.length && !newCartItem) return;
        const newCartItems = newCartItem ? [...cartItems, newCartItem] : cartItems;
        const params = new URLSearchParams();
        params.append('products', newCartItems.map((item) => `${item.collection}:${item.name}`).join(',') || '');
        const res = await axios.get(`/product/multiple?${params.toString()}`);
        const { products } = res.data;
        const productsWithQuantity = products.map((product: Product) => {
            const cartItem = newCartItems.find((item) => item.name === product.name && item.collection === product.collection);
            return { ...product, quantity: cartItem!.quantity };
        });
        setCartProducts(productsWithQuantity);
    };

    const fetchSuggestedProducts = async () => {
        const res = await axios.get('/products?available=true&limit=2');
        const { products } = res.data;
        setSuggestedProducts(products);
    };

    const handleCartOpen = () => {
        setCartOpen((prev) => !prev);
        if (!cartItems.length) {
            fetchSuggestedProducts();
        }
        fetchProductsData();
    };

    const handleAddProduct = (product: ProductWithQuantity) => {
        const newItem = { collection: product.collection, name: product.name, quantity: 1 };
        setCartItems((prev) => [...prev, newItem]);
        fetchProductsData(newItem);
    };

    return (
        <nav
            className={`fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between bg-zinc-100 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-20'}`}>
            <div id='left' className='px-4'>
                <a href='/'>
                    <Logo />
                </a>
            </div>
            <div id='center' className='absolute left-1/2 flex h-20 -translate-x-1/2 items-center justify-center'></div>
            <div id='right' className='flex items-center gap-4 px-8'>
                <a href='/account' aria-label='link-to-account-page'>
                    <UserIcon className='text-2xl hover:text-taupe' />
                </a>
                <button onClick={handleSearch} aria-label='search-button'>
                    <SearchIcon className='text-2xl hover:text-taupe' />
                </button>
                <button onClick={handleCartOpen} aria-label='cart-button'>
                    <CartIcon className='text-2xl hover:text-taupe' />
                    {cartItems.length > 0 && (
                        <span className='text-2xs absolute -translate-y-7 translate-x-1 rounded-full bg-red-500 px-1 font-bold text-white'>
                            {cartItems.reduce((prev, curr) => {
                                return prev + curr.quantity;
                            }, 0)}
                        </span>
                    )}
                </button>
            </div>
            <aside id='cart-menu' className={`animate-slide-in fixed right-0 top-0 h-screen w-full max-w-[30rem] border-l-2 bg-slate-100 px-8 pt-20 ${!cartOpen && 'hidden'}`}>
                <div className='flex justify-between'>
                    <h2 className='text-2xl font-bold tracking-tight text-taupe/80'>Your Cart</h2>
                    <button onClick={handleCartClose} className='grid place-items-center text-4xl text-taupe/80'>
                        <XIcon />
                    </button>
                </div>
                {state === 'loading' ? (
                    <Spinner />
                ) : state === 'loggedIn' ? (
                    <>
                        {cartProducts.length === 0 && (
                            <div className='flex w-full flex-col items-center'>
                                <h3 className='mt-8 text-lg font-semibold text-taupe'>Your cart is empty!</h3>
                                <h4 className='text-taupe'>Here are some products you may like:</h4>
                                <div className='mt-4 grid grid-cols-2 place-items-center space-y-2'>
                                    {suggestedProducts.map((product: ProductWithQuantity) => (
                                        <MinimizedProductCard
                                            setProducts={setCartItems}
                                            handleUpdateCart={handleUpdateCart}
                                            key={product.name + Math.random()}
                                            product={product}
                                            suggested={true}
                                            addProduct={handleAddProduct}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className='mt-8 grid grid-cols-2 place-items-center space-y-2'>
                            {cartProducts.map((product: ProductWithQuantity) => (
                                <MinimizedProductCard setProducts={setCartItems} handleUpdateCart={handleUpdateCart} key={product.name + Math.random()} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='flex w-full flex-col items-center'>
                        <h3 className='mt-20 text-xl font-semibold text-taupe'>You need to log in to access cart.</h3>
                        <a className='mt-7 w-2/3 rounded-md bg-darktan px-4 py-2 text-center font-semibold text-taupe' href='/account/signin'>
                            Log in
                        </a>
                        <p className='mt-5 text-taupe'>
                            Don't have an account?{' '}
                            <a href='/account/register' className='underline'>
                                Register now!
                            </a>
                        </p>
                    </div>
                )}
            </aside>
        </nav>
    );
};

export default Navbar;
