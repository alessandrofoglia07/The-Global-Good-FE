import Navbar from '@/components/Navbar';
import Status from '@/components/Status';
import PeopleBg from '@/assets/imgs/landscape-people-1.jpg';
import React, { useRef, useState } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IconType } from 'react-icons';
import { FaRegHandshake as HandShakeIcon, FaHammer as HammerIcon, FaRegLightbulb as LightBulbIcon } from 'react-icons/fa';
import { LuRecycle as RecycleIcon, LuArrowRightCircle as RightArrowIcon, LuArrowLeftCircle as LeftArrowIcon } from 'react-icons/lu';

interface Value {
    icon: IconType;
    title: string;
    description: string;
}

const values: Value[] = [
    {
        icon: HandShakeIcon,
        title: 'People over Profit',
        description:
            'We prioritize the well-being of producers and artisans. We ensure fair wages, safe working conditions, and empower communities through sustainable trade practices.'
    },
    {
        icon: RecycleIcon,
        title: 'Environmental Responsibility',
        description: 'We minimize our environmental footprint by offering eco-conscious products, using sustainable packaging, and offsetting our carbon emissions.'
    },
    {
        icon: HammerIcon,
        title: 'Global Craftsmanship',
        description:
            'We celebrate the unique skills and traditions of artisans around the world. We offer a curated selection of handcrafted goods that tell a story and promote cultural heritage.'
    },
    {
        icon: LightBulbIcon,
        title: 'Empowering Conscious Consumers',
        description: 'We believe in the power of informed choices. We provide detailed information about our products and their origins, allowing you to shop with a conscience.'
    }
];

const MainPage: React.FC = () => {
    const [bestSellers, setBestSellers] = useState(Array(9).fill(null));
    const [windowWidth] = useWindowSize();

    const slider = useRef<Slider>(null);

    const settings: Settings = {
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
        <div id='MainPage' className='flex w-full flex-col items-center'>
            <Navbar />
            <section id='landing' className='relative h-[calc(80vh)] w-full'>
                <img alt='nature-background' draggable='false' src={PeopleBg} className='absolute left-0 top-0 h-full min-w-[100vw] object-cover brightness-[0.6]' />
                <div className='absolute left-1/2 top-1/2 flex h-max max-h-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 pb-20 -md:w-full -lg:w-3/4'>
                    <h1 className='pb-8 text-center text-5xl font-bold tracking-tight text-slate-100 md:text-6xl lg:text-7xl'>Beyond Shopping.</h1>
                    <h1 className='text-center text-5xl font-bold tracking-tight text-slate-100 md:text-6xl lg:text-7xl'>Fair Trade Products that Make a Difference</h1>
                    <button className='mt-12 rounded-lg bg-slate-100 px-8 py-4 text-2xl uppercase tracking-wider transition-colors hover:bg-slate-200'>Support us now</button>
                </div>
            </section>
            <section id='bestsellers' className='w-full bg-slate-50 py-4'>
                <div className='-xs:pb-20 flex w-full items-center justify-between px-12 pb-8 pt-12'>
                    <button onClick={() => sliderMove('prev')}>
                        <LeftArrowIcon className='text-taupe text-3xl' />
                    </button>
                    <h1 className='w-fit text-center text-4xl tracking-tight'>Our Best Sellers</h1>
                    <button onClick={() => sliderMove('next')}>
                        <RightArrowIcon className='text-taupe text-3xl' />
                    </button>
                </div>
                <div className='w-full pb-12'>
                    <Slider ref={slider} {...settings}>
                        {bestSellers.map((_, i) => (
                            <div key={i} className='p-4'>
                                <div className='bg-taupe aspect-square rounded-full' />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
            <section id='values' className='bg-tan min-h-[40rem] w-full pt-8 md:px-8'>
                <h1 className='text-taupe relative left-1/2 w-fit -translate-x-1/2 pb-8 pt-12 text-center text-5xl font-bold tracking-tighter'>
                    Making a Positive Impact, One Purchase at a Time
                </h1>
                <div className='mb-8 grid h-full w-full gap-8 py-12 sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-2 md:grid-rows-1 lg:my-8 lg:grid-cols-4 lg:grid-rows-1'>
                    {values.map((value, i) => (
                        <div key={i} className='*:text-taupe flex h-full w-full flex-col items-center text-center'>
                            <value.icon className='text-6xl' />
                            <h3 className='my-4 text-2xl font-bold tracking-tight'>{value.title}</h3>
                            <p className='text-lg'>{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className='mt-48 flex flex-col items-center'>
                {/* TODO: remove later on */}
                <a href='/auth/signup'>Sign up page</a>
                <a href='/auth/login'>Login page</a>
                <Status />
            </section>
        </div>
    );
};

export default MainPage;
