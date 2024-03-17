import Navbar from '@/components/Navbar';
import Status from '@/components/Status';
import NatureBg from '@/assets/imgs/bg-img-1.jpg';
import React from 'react';

const MainPage: React.FC = () => {
    return (
        <div id='MainPage' className='flex w-full flex-col items-center'>
            <Navbar />
            <section className='relative h-[calc(80vh)] w-full'>
                <img src={NatureBg} className='absolute left-0 top-0 h-full min-w-[100vw] object-cover brightness-75' />
                <div className='absolute left-1/2 top-1/2 flex h-max -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 pb-20 -md:w-full'>
                    <h1 className='pb-8 text-center text-5xl font-bold tracking-tight text-slate-100 md:text-7xl'>Beyond Shopping.</h1>
                    <h1 className='text-center text-5xl font-bold tracking-tight text-slate-100 md:text-7xl'>Fair Trade Products that Make a Difference</h1>
                    <button className='mt-12 rounded-lg bg-slate-100 px-8 py-4 text-2xl uppercase tracking-wider'>Support us now</button>
                </div>
            </section>
            <a href='/auth/signup'>Sign up page</a>
            <a href='/auth/login'>Login page</a>
            <Status />
        </div>
    );
};

export default MainPage;
