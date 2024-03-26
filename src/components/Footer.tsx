import React from 'react';
import { footerSections } from '@/assets/data/footerSections';
import FooterNewsletter from './FooterNewsletter';
import useWindowSize from '@/hooks/useWindowSize';
import Logo from './Logo';

const Footer: React.FC = () => {
    const [windowW] = useWindowSize();

    const handleSubscribeNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget[0] as HTMLInputElement).value;
        // TODO: Subscribe to newsletter
        console.log('Subscribed to newsletter with email:', email);
    };

    return (
        <footer className='grid w-full place-items-center bg-taupe pb-40 pt-20'>
            <div className='flex h-full w-full flex-col pl-[5%] lg:grid lg:grid-cols-5 lg:px-[15%] -lg:gap-8'>
                {windowW > 1024 ? <FooterNewsletter onSubscribe={handleSubscribeNewsletter} /> : <Logo className='-mb-4 w-fit !text-3xl text-slate-100 *:!text-4xl' />}
                {footerSections.map((section, i) => (
                    <div className='pl-8' key={i}>
                        <h1 className='mt-2 text-2xl font-bold tracking-tight text-slate-100'>{section.title}</h1>
                        <ul className='mt-4'>
                            {section.links.map((link, j) => (
                                <li key={j} className='mt-2 w-fit transition-transform duration-100 hover:translate-x-1'>
                                    <a href={link.href} className='flex items-center gap-2 text-slate-100 hover:text-slate-200'>
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {windowW < 1024 && <FooterNewsletter onSubscribe={handleSubscribeNewsletter} />}
            </div>
        </footer>
    );
};

export default Footer;
