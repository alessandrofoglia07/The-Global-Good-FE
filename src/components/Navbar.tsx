import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { LuUser2 as UserIcon, LuSearch as SearchIcon, LuShoppingCart as CartIcon } from 'react-icons/lu';

const Navbar: React.FC = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (lastScrollY === 0) {
            setShow(true);
            return setLastScrollY(window.scrollY);
        }
        if (window.scrollY > lastScrollY && window.scrollY > 80) setShow(false);
        else setShow(true);
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const handleSearch = () => {
        // TODO: implement search
        console.log('search');
    };

    const handleCartOpen = () => {
        // TODO: implement cart
        console.log('cart');
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
                <a href='/account'>
                    <UserIcon className='text-2xl hover:text-taupe' />
                </a>
                <button onClick={handleSearch}>
                    <SearchIcon className='text-2xl hover:text-taupe' />
                </button>
                <button onClick={handleCartOpen}>
                    <CartIcon className='text-2xl hover:text-taupe' />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
