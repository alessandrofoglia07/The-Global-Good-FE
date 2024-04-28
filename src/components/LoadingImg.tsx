import React, { useState } from 'react';
import Spinner from './Spinner';

interface Props {
    src: string;
    alt: string;
    className?: string;
}

const LoadingImg: React.FC<Props> = ({ src, alt, className }: Props) => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div className={loading ? 'block' : 'hidden'}>
                <Spinner className={className} />
            </div>
            <div className={loading ? 'hidden' : `block`}>
                <img draggable='false' className={className} src={src} alt={alt} onLoad={() => setLoading(false)} />
            </div>
        </>
    );
};

export default LoadingImg;
