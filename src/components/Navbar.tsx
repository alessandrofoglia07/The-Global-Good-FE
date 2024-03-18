import React from 'react';
import Logo from './Logo';

const Navbar = () => {
    return (
        <nav className='flex h-20 w-full items-center'>
            <Logo className='px-3' />
        </nav>
    );
};

export default Navbar;
