import { HiOutlineGlobe } from 'react-icons/hi';

interface Props {
    className?: string;
}

const Logo = ({ className }: Props) => {
    return (
        <h1 draggable='false' className={`flex select-none items-center gap-1 text-2xl font-extrabold tracking-tighter -md:text-xl -xs:text-lg ${className}`}>
            <HiOutlineGlobe className='text-3xl' /> TheGlobalGood
        </h1>
    );
};

export default Logo;
