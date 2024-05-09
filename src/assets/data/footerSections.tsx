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
            { title: 'Shop', href: '/shop' },
            { title: 'Blog', href: '/blog' },
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
                href: ''
            },
            {
                title: (
                    <>
                        <FacebookIcon className='text-xl' /> Facebook
                    </>
                ),
                href: ''
            },
            {
                title: (
                    <>
                        <XIcon className='text-xl' /> Twitter
                    </>
                ),
                href: ''
            }
        ]
    },
    {
        title: 'Collections',
        links: collections.map((collection) => ({
            title: collection.title,
            href: `/shop?collection=${collection.id}`
        }))
    }
];
