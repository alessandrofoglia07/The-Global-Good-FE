import { HiOutlineGlobe } from 'react-icons/hi';

interface Props {
    className?: string;
}

const Logo = ({ className }: Props) => {
    return (
        <h3 draggable='false' className={`flex select-none items-center gap-1 text-2xl font-extrabold tracking-tighter ${className}`}>
            <HiOutlineGlobe className='text-3xl' /> TheGlobalGood
        </h3>
    );
};

export default Logo;
