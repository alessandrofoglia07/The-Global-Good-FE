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
import LoginRequirer from './LoginRequirer';

const Navbar: React.FC = () => {
    const { getSession } = useContext(AccountContext)!;

    const [state, setState] = useState<'loading' | 'loggedIn' | 'guest'>('loading');
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useRecoilState(cartState);
    const [cartProducts, setCartProducts] = useState<ProductWithQuantity[]>([]);
    const [suggestedProducts, setSuggestedProducts] = useState<ProductWithQuantity[]>([]);

    const updateCartMenuMainHeight = () => {
        const cartMenu = document.getElementById('cart-menu');
        if (cartMenu) {
            const cartMenuHeader = document.getElementById('cart-menu-header');
            const cartMenuFooter = document.getElementById('cart-menu-footer');
            if (cartMenuHeader && cartMenuFooter) {
                const cartMenuHeaderHeight = cartMenuHeader.offsetHeight;
                const cartMenuFooterHeight = cartMenuFooter.offsetHeight;
                document.getElementById('cart-menu-main')!.style.maxHeight = `${cartMenu.offsetHeight - cartMenuHeaderHeight - cartMenuFooterHeight - 16 * 5}px`;
            }
        }
    };

    useEffect(() => {
        updateCartMenuMainHeight();
        window.addEventListener('resize', updateCartMenuMainHeight);
        return () => window.removeEventListener('resize', updateCartMenuMainHeight);
    }, [cartOpen, cartProducts]);

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
        document.body.style.overflow = 'auto';
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
        const currState = state;

        try {
            setState('loading');
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
        } catch (err) {
            console.error(err);
        } finally {
            setState(currState);
        }
    };

    const fetchSuggestedProducts = async () => {
        const res = await axios.get('/products?available=true&limit=2');
        const { products } = res.data;
        setSuggestedProducts(products);
    };

    useEffect(() => {
        if (!cartItems.length) fetchSuggestedProducts();
    }, [cartItems]);

    const handleCartOpen = () => {
        setCartOpen((prev) => !prev);
        document.body.style.overflow = 'hidden';
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
        <>
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
                            <span className='absolute -translate-y-7 translate-x-1 rounded-full bg-red-500 px-1 text-2xs font-bold text-white'>
                                {cartItems.reduce((prev, curr) => {
                                    return prev + curr.quantity;
                                }, 0)}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
            <aside id='cart-menu' className={`animate-slide-in fixed right-0 top-0 z-50 h-screen w-full max-w-[30rem] border-l-2 bg-slate-50 pr-4 pt-20 ${!cartOpen && 'hidden'}`}>
                <div id='cart-menu-header' className='flex justify-between px-8 pb-4'>
                    <h2 className='text-2xl font-bold tracking-tight text-taupe/80'>Your Cart</h2>
                    <button onClick={handleCartClose} className='grid place-items-center text-4xl text-taupe/80'>
                        <XIcon />
                    </button>
                </div>
                {state === 'loading' ? (
                    <Spinner className='mx-auto mt-20' />
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
                        <div>
                            <div id='cart-menu-main' className='overflow-auto px-4'>
                                <div className='mt-8 grid grid-cols-2 place-items-center space-y-2'>
                                    {cartProducts.map((product: ProductWithQuantity) => (
                                        <MinimizedProductCard setProducts={setCartItems} handleUpdateCart={handleUpdateCart} key={product.name + Math.random()} product={product} />
                                    ))}
                                </div>
                            </div>
                            <div id='cart-menu-footer' className='absolute bottom-0 left-0 h-1/4 w-full border-t bg-blue-50 py-8 pl-16 pr-8'>
                                <h3 className='text-xl text-taupe'>
                                    <span className='font-semibold'>Subtotal</span>
                                    <span className='float-right font-bold'>$ {cartProducts.reduce((prev, curr) => prev + curr.price * curr.quantity, 0).toFixed(2)}</span>
                                </h3>
                                <h4 className='mb-4 mt-2 text-taupe/80'>Shipping, taxes, and discounts calculated at checkout.</h4>
                                <a className='w-full cursor-pointer rounded-md bg-darktan px-4 py-2 text-center font-semibold text-white'>Proceed to checkout</a>
                            </div>
                        </div>
                    </>
                ) : (
                    <LoginRequirer text='You need to log in to access cart.' className='mt-20' />
                )}
            </aside>
        </>
    );
};

export default Navbar;
