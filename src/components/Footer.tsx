import React from 'react';
import { footerSections } from '@/assets/data/footerSections';
import Logo from './Logo';

const Footer: React.FC = () => {
    return (
        <footer className='grid w-full place-items-center bg-taupe pb-40 pt-20'>
            <div className='flex h-full w-full flex-col pl-[5%] md:grid md:grid-cols-2 lg:grid-cols-5 lg:px-[10%] xl:px-[15%] -lg:gap-8'>
                <div className='col-span-2 border-slate-100 px-8 lg:border-r lg:px-16'>
                    <Logo className='w-fit text-3xl text-slate-100 *:text-4xl' />
                    <h3 className='mt-4 text-lg text-slate-100'>Help us make the world a better place by sharing our mission with your friends and family.</h3>
                </div>
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
            </div>
        </footer>
    );
};

export default Footer;
