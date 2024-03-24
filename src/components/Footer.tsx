import React from 'react';
import Logo from './Logo';
import { footerSections } from '@/assets/data/footerSections';

const Footer: React.FC = () => {
    const handleSubscribeNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget[0] as HTMLInputElement).value;
        // TODO: Subscribe to newsletter
        console.log('Subscribed to newsletter with email:', email);
    };

    return (
        <footer className='grid w-full place-items-center bg-taupe pb-40 pt-20'>
            <div className='grid h-full grid-cols-5 px-[15%]'>
                <div className='col-span-2 border-r border-slate-100 px-16'>
                    <Logo className='w-fit text-slate-100 transition-colors' />
                    <form onSubmit={handleSubscribeNewsletter}>
                        <h1 className='mt-6 text-2xl font-bold tracking-tight text-slate-100'>Stay in touch</h1>
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
                            By signing up to our newsletter you agree to our <a href='/pages/terms-conditions'>terms</a> and <a href='/pages/privacy-policy'>privacy policy</a>.
                        </p>
                    </form>
                </div>
                {footerSections.map((section, i) => (
                    <div className='pl-8' key={i}>
                        <h1 className='mt-2 text-2xl font-bold tracking-tight text-slate-100'>{section.title}</h1>
                        <ul className='mt-4'>
                            {section.links.map((link, j) => (
                                <li key={j} className='mt-2'>
                                    <a href={link.href} className='flex items-center gap-2 text-slate-100 hover:text-slate-200'>
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
