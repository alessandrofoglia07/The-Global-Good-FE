import Navbar from '@/components/Navbar';
import PeopleBg from '@/assets/imgs/landscape-people-1.jpg';
import NatureBg from '@/assets/imgs/landscape-nature-1.jpg';
import React, { useRef, useState, useEffect } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LuArrowRightCircle as RightArrowIcon, LuArrowLeftCircle as LeftArrowIcon } from 'react-icons/lu';
import Footer from '@/components/Footer';
import { values } from '@/assets/data/brandValues';

const MainPage: React.FC = () => {
    const [bestSellers, setBestSellers] = useState(Array(9).fill(null));
    const [windowWidth] = useWindowSize();

    const slider = useRef<Slider>(null);

    useEffect(() => {
        const sliderNextInterval = setInterval(() => {
            if (slider.current) slider.current.slickNext();
        }, 4000);

        return () => clearInterval(sliderNextInterval);
    }, []);

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
        <div id='MainPage' className='flex w-screen flex-col items-center'>
            <Navbar />
            <section id='landing' className='relative mt-20 h-[calc(80vh)] w-full'>
                <img alt='nature-background' draggable='false' src={PeopleBg} className='absolute left-0 top-0 h-full min-w-[100vw] object-cover brightness-[0.6]' />
                <div className='absolute left-1/2 top-1/2 flex h-max max-h-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 pb-20 -md:w-full -lg:w-3/4'>
                    <h1 className='pb-8 text-center text-5xl font-bold tracking-tight text-slate-100 md:text-6xl lg:text-7xl'>Beyond Shopping.</h1>
                    <h1 className='text-center text-5xl font-bold tracking-tight text-slate-100 md:text-6xl lg:text-7xl'>Fair Trade Products that Make a Difference</h1>
                    <a href='/shop' className='mt-12 rounded-lg bg-slate-100 px-8 py-4 text-center text-2xl uppercase tracking-wider transition-colors hover:bg-slate-200'>
                        Support us now
                    </a>
                </div>
            </section>
            <section id='bestsellers' className='w-full bg-slate-50 py-4'>
                <div className='flex w-full items-center justify-between px-12 pb-8 pt-12 -xs:pb-20'>
                    <button onClick={() => sliderMove('prev')}>
                        <LeftArrowIcon className='text-3xl text-taupe' />
                    </button>
                    <h1 className='w-fit text-center text-4xl font-semibold tracking-tight text-taupe'>Our Best Sellers</h1>
                    <button onClick={() => sliderMove('next')}>
                        <RightArrowIcon className='text-3xl text-taupe' />
                    </button>
                </div>
                <div className='w-full pb-12'>
                    <Slider ref={slider} {...settings}>
                        {bestSellers.map((_, i) => (
                            <div key={i} className='p-4'>
                                <div className='aspect-square rounded-full bg-taupe' />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
            <section id='values' className='min-h-[40rem] w-full bg-tan pt-8 md:px-8'>
                <h1 className='relative left-1/2 w-fit -translate-x-1/2 pb-8 pt-12 text-center text-5xl font-bold tracking-tighter text-taupe'>
                    Making a Positive Impact, One Purchase at a Time
                </h1>
                <div className='mb-8 grid h-full w-full gap-8 py-12 sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-2 md:grid-rows-1 lg:my-8 lg:grid-cols-4 lg:grid-rows-1'>
                    {values.map((value, i) => (
                        <div key={i} className='flex h-full w-full flex-col items-center px-2 text-center *:text-taupe'>
                            <value.icon className='text-6xl' />
                            <h3 className='my-4 text-2xl font-bold tracking-tight'>{value.title}</h3>
                            <p className='text-lg'>{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section id='discover' className='flex aspect-[2/1] max-h-[50rem] w-full items-center bg-slate-50 -md:flex-col'>
                <div className='grid h-full place-items-center md:w-1/2'>
                    <div className='p-16 lg:p-20 xl:p-32'>
                        <h2 className='mb-6 text-4xl font-semibold tracking-tight text-taupe'>Shop at TheGlobalGood and support a more sustainable and equitable world.</h2>
                        <h3 className='mb-12 text-xl'>
                            At TheGlobalGood, we believe in connecting you with products that are good for you and good for the planet. We partner with artisans and businesses around
                            the world who are committed to fair trade practices, sustainable production, and ethical labor.
                        </h3>
                        <a
                            href='/shop'
                            className='hover:bg-darktan rounded-lg border border-taupe bg-tan px-8 py-4 text-xl font-semibold uppercase tracking-wider text-taupe transition-colors'>
                            Visit our shop
                        </a>
                    </div>
                </div>
                <div className='h-full w-1/2 -md:hidden'>
                    <img alt='nature-background' draggable='false' src={NatureBg} className='h-full object-cover brightness-90' />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default MainPage;
