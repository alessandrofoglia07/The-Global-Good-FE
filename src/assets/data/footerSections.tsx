import { FaInstagram as InstagramIcon, FaFacebook as FacebookIcon } from 'react-icons/fa';
import { FaXTwitter as XIcon } from 'react-icons/fa6';
import collections from './collections';

interface FooterSection {
    title: string;
    links: { title: React.ReactNode; href: string }[];
}

export const footerSections: FooterSection[] = [
    {
        title: 'Company',
        links: [
            { title: 'About us', href: '/info/about-us' },
            { title: 'Shop', href: '/shop' },
            { title: 'Privacy Policy', href: '/info/privacy-policy' },
            { title: 'Terms & Conditions', href: '/info/terms-conditions' }
        ]
    },
    {
        title: 'Social',
        links: [
            {
                title: (
                    <>
                        <InstagramIcon className='text-xl' /> Instagram
                    </>
                ),
                href: 'https://www.instagram.com/'
            },
            {
                title: (
                    <>
                        <FacebookIcon className='text-xl' /> Facebook
                    </>
                ),
                href: 'https://www.facebook.com/'
            },
            {
                title: (
                    <>
                        <XIcon className='text-xl' /> Twitter
                    </>
                ),
                href: 'https://x.com/'
            }
        ]
    },
    {
        title: 'Collections',
        links: collections
    }
];
