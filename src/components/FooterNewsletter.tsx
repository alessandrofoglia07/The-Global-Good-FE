import React, { FormEventHandler } from 'react';
import Logo from './Logo';
import useWindowSize from '@/hooks/useWindowSize';

interface Props {
    onSubscribe: FormEventHandler<HTMLFormElement>;
}

const FooterNewsletter: React.FC<Props> = ({ onSubscribe }: Props) => {
    const [windowW] = useWindowSize();

    return (
        <div className='col-span-2 border-slate-100 px-8 lg:border-r lg:px-16'>
            {windowW > 1024 && <Logo className='w-fit text-slate-100' />}
            <form onSubmit={onSubscribe}>
                <h1 className='text-2xl font-bold tracking-tight text-slate-100 lg:mt-6'>Stay in touch</h1>
                <h4 className='mt-3 text-sm text-slate-100'>Sign up to our newsletter and receive every news about our store and artisans we support.</h4>
                <div className='py-4'>
                    <input
                        type='email'
                        placeholder='Email address'
                        className='rounded-l-sm border-2 border-slate-100 bg-taupe px-4 py-2 text-white caret-white placeholder:text-slate-100/50 focus:outline-none'
                    />
                    <button type='submit' className='border-2 border-slate-100 bg-slate-100 px-4 py-2'>
                        Submit
                    </button>
                </div>
                <p className='text-sm text-slate-100/50'>
                    By signing up to our newsletter you agree to our <a href='/info/terms-conditions'>terms</a> and <a href='/info/privacy-policy'>privacy policy</a>.
                </p>
            </form>
        </div>
    );
};

export default FooterNewsletter;
