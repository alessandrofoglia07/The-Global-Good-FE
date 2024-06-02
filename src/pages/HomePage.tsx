import Navbar from '@/components/Navbar';
import PeopleBg from '@/assets/imgs/landscape-people-1.png';
import NatureBg from '@/assets/imgs/landscape-nature-1.png';
import React, { useRef, useState, useEffect } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LuArrowRightCircle as RightArrowIcon, LuArrowLeftCircle as LeftArrowIcon } from 'react-icons/lu';
import Footer from '@/components/Footer';
import { values } from '@/assets/data/brandValues';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import axios from '@/api/axios';
import ProductCard from '@/components/ProductCard';
import { Helmet } from 'react-helmet';

const MainPage: React.FC = () => {
    const [bestSellers, setBestSellers] = useState<Product[] | undefined[]>(Array(8).fill(undefined));
    const [windowWidth] = useWindowSize();

    const slider = useRef<Slider>(null);

    useEffect(() => {
        const sliderNextInterval = setInterval(() => {
            if (slider.current) slider.current.slickNext();
        }, 4000);

        return () => clearInterval(sliderNextInterval);
    }, []);

    useEffect(() => {
        fetchBestSellers();
    }, []);

    const fetchBestSellers = async () => {
        try {
            const res = await axios.get('/products?available=true&limit=8');
            setBestSellers(res.data.products);
        } catch (err) {
            console.error(err);
        }
    };

    const settings: Settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: Math.max(Math.floor(windowWidth / 300), 1),
        slidesToScroll: 1,
        swipeToSlide: true,
        touchThreshold: 10,
        className: 'cursor-grab active:cursor-grabbing'
    };

    const sliderMove = (direction: 'prev' | 'next') => {
        if (slider.current) {
            if (direction === 'prev') slider.current.slickPrev();
            else slider.current.slickNext();
        }
    };

    return (
        <div id='MainPage' className='flex flex-col items-center'>
            <Helmet>
                <meta
                    name='description'
                    content='TheGlobalGood is an online store that offers a wide range of ethical trade products. We believe in connecting you with products that are good for you and good for the planet.'
                />
            </Helmet>
            <Navbar />
            <section id='landing' className='relative mt-20 h-[80vh] w-full'>
                <img alt='nature-background' draggable='false' src={PeopleBg} className='absolute left-0 top-0 h-full w-[100vw] object-cover brightness-[0.6]' />
                <div className='absolute left-1/2 top-1/2 flex h-max max-h-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 pb-20 -md:w-full -md:pt-8 -lg:w-3/4'>
                    <h1 className='pb-8 text-center text-5xl font-bold tracking-tight text-slate-100 md:text-6xl lg:text-7xl'>Beyond Shopping.</h1>
                    <h1 className='text-center text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl md:text-6xl lg:text-7xl'>Ethical Trade Products that Make a Difference</h1>
                    <a href='/shop' className='mt-12 rounded-lg bg-slate-100 px-8 py-4 text-center text-2xl uppercase tracking-wider transition-colors hover:bg-slate-200 md:px-16'>
                        Shop now
                    </a>
                </div>
            </section>
            <section id='bestsellers' className='w-full py-4'>
                <div className='flex w-full items-center justify-between px-8 pb-8 pt-12 md:px-12 -xs:pb-20'>
                    <button onClick={() => sliderMove('prev')} aria-label='button-arrow-left'>
                        <LeftArrowIcon className='text-3xl text-taupe' />
                    </button>
                    <h1 className='w-fit text-center text-4xl font-semibold tracking-tight text-taupe'>Our Best Sellers</h1>
                    <button onClick={() => sliderMove('next')} aria-label='button-arrow-right'>
                        <RightArrowIcon className='text-3xl text-taupe' />
                    </button>
                </div>
                <div className='w-full pb-12'>
                    <Slider ref={slider} {...settings}>
                        {bestSellers.map((_, i) => (
                            <div key={i} className='p-4'>
                                <ProductCard product={bestSellers[i]} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
            <section id='values' className='min-h-[40rem] w-full bg-tan/80 px-8 pt-8'>
                <motion.h1
                    initial={{ translateX: '-50%', scale: 1, opacity: 0 }}
                    whileInView={{
                        translateX: '-50%',
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 1, delay: 0.3 }
                    }}
                    viewport={{ once: true }}
                    className='relative left-1/2 w-fit pb-4 pt-12 text-center text-4xl font-bold tracking-tighter text-taupe md:pb-8 md:text-5xl'>
                    Making a Positive Impact, One Purchase at a Time
                </motion.h1>
                <div className='mb-8 grid h-full w-full gap-8 py-12 sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-2 md:grid-rows-1 lg:my-8 lg:grid-cols-4 lg:grid-rows-1'>
                    {values.map((value, i) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{
                                opacity: 1,
                                transition: { duration: 0.5, delay: 0.3 + i * 0.2 }
                            }}
                            viewport={{ once: true }}
                            key={i}
                            className='flex h-full w-full flex-col items-center px-2 text-center *:text-taupe'>
                            <value.icon className='text-6xl' />
                            <h3 className='my-4 text-2xl font-bold tracking-tight'>{value.title}</h3>
                            <p className='text-lg'>{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            <section id='discover-blog' className='flex aspect-[2/1] max-h-max w-full items-center md:h-fit md:max-h-[80vh] -md:flex-col'>
                <div className='grid h-fit w-screen place-items-center md:w-1/2'>
                    <div className='max-w-[100vw] px-8 py-16 lg:p-20 '>
                        <motion.h2
                            initial={{ translateY: -50, opacity: 0.5 }}
                            whileInView={{ translateY: 0, opacity: 1, transition: { duration: 0.8 } }}
                            viewport={{ once: true }}
                            className='mb-6 text-4xl font-semibold tracking-tight text-taupe'>
                            <span className='font-bold tracking-tighter'>TheGlobalGood</span> also has a <span className='underline'>blog</span>!
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0.2 }}
                            whileInView={{ opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
                            viewport={{ once: true }}
                            className='mb-12 text-xl'>
                            At TheGlobalGood, we believe in connecting you with products that are good for you and good for the planet. Check out our blog to learn more about our
                            mission and the impact we are making around the world. We are committed to providing you with the best products and the best information.
                        </motion.h3>
                        <a
                            href='/blog'
                            className='max-h-[50rem] rounded-lg border border-slate-300 bg-tan px-16 py-4 text-xl font-semibold uppercase tracking-wider text-taupe shadow-md transition-colors hover:bg-darktan'>
                            Our blog
                        </a>
                    </div>
                </div>
                <div className='h-full w-1/2 -md:hidden'>
                    <img alt='nature-background' draggable='false' src={NatureBg} className='h-full object-cover brightness-90' />
                </div>
            </section>
            <section id='call-to-action' className='flex w-full flex-col items-center bg-tan/60 px-8 py-24'>
                <motion.h1
                    initial={{ scale: 1, opacity: 0 }}
                    whileInView={{
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 1, delay: 0.3 }
                    }}
                    viewport={{ once: true }}
                    className='w-full pb-4 text-center text-4xl font-bold tracking-tight text-taupe md:pb-8 md:text-5xl'>
                    Start Shopping Today
                </motion.h1>
                <a
                    href='/shop'
                    className='max-h-[50rem] max-w-[90vw] rounded-xl border border-slate-300 bg-white px-16 py-8 text-2xl font-bold uppercase tracking-wide text-taupe shadow-md transition-colors hover:bg-zinc-100 md:px-32'>
                    Shop now
                </a>
            </section>
            <Footer />
        </div>
    );
};

export default MainPage;
