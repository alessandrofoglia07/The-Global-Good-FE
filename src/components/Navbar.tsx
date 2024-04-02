import React, { useEffect, useState, useContext } from 'react';
import Logo from './Logo';
import { LuUser2 as UserIcon, LuSearch as SearchIcon, LuShoppingCart as CartIcon } from 'react-icons/lu';
import { RiAdminLine as AdminIcon } from 'react-icons/ri';
import { AccountContext } from '@/context/Account';

const Navbar: React.FC = () => {
    const { isAdmin } = useContext(AccountContext);

    const [admin, setAdmin] = useState<boolean | null>(null);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const admin = await isAdmin();
                setAdmin(admin);
            } catch (err) {
                setAdmin(false);
            }
        };

        checkAdmin();
    }, [isAdmin]);

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
                {admin && (
                    <a href='/admin' aria-label='link-to-admin-page'>
                        <span className='text-2xl hover:text-taupe'>
                            <AdminIcon className='text-2xl hover:text-taupe' />
                        </span>
                    </a>
                )}
                <a href='/account' aria-label='link-to-account-page'>
                    <UserIcon className='text-2xl hover:text-taupe' />
                </a>
                <button onClick={handleSearch} aria-label='search-button'>
                    <SearchIcon className='text-2xl hover:text-taupe' />
                </button>
                <button onClick={handleCartOpen} aria-label='cart-button'>
                    <CartIcon className='text-2xl hover:text-taupe' />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
