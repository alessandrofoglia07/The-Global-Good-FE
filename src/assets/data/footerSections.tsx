import { FaInstagram as InstagramIcon, FaFacebook as FacebookIcon } from 'react-icons/fa';
import { FaXTwitter as XIcon } from 'react-icons/fa6';

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
        links: [
            { title: 'Clothing & Accessories', href: '/shop?collection=clothing-accessories' },
            { title: 'Home & Living', href: '/shop?collection=home-living' },
            { title: 'Beauty & Wellness', href: '/shop?collection=beauty-wellness' },
            { title: 'Food & Beverages', href: '/shop?collection=food-beverages' }
        ]
    }
];
