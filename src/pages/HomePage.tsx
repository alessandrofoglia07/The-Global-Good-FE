import Navbar from '@/components/Navbar';
import Status from '@/components/Status';
import PeopleBg from '@/assets/imgs/landscape-people-1.jpg';
import React from 'react';

const MainPage: React.FC = () => {
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
                <h1 className='relative left-1/2 w-fit -translate-x-1/2 py-8 text-4xl tracking-tight'>Our Best Sellers</h1>
                <div className='flex w-full flex-wrap justify-evenly pb-4 *:aspect-square *:w-72 *:rounded-full *:bg-slate-500'>
                    {/* TODO: Add products later */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </section>
            <section id='values'>{/* TODO */}</section>
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
