import Logo from './Logo';
import { LuUser2 as UserIcon, LuSearch as SearchIcon, LuShoppingCart as CartIcon } from 'react-icons/lu';

const Navbar = () => {
    const handleSearch = () => {
        // TODO: implement search
        console.log('search');
    };

    const handleCartOpen = () => {
        // TODO: implement cart
        console.log('cart');
    };

    return (
        <nav className='flex h-20 w-full items-center justify-between'>
            <div id='left' className='px-4'>
                <a href='/'>
                    <Logo />
                </a>
            </div>
            <div id='center' className='absolute left-1/2 flex h-20 -translate-x-1/2 items-center justify-center'></div>
            <div id='right' className='flex items-center gap-4 px-8'>
                <a href='/account'>
                    <UserIcon className='text-2xl' />
                </a>
                <button onClick={handleSearch}>
                    <SearchIcon className='text-2xl' />
                </button>
                <button onClick={handleCartOpen}>
                    <CartIcon className='text-2xl' />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
