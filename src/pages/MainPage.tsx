import React from 'react';

const MainPage: React.FC = () => {
    return (
        <div id='MainPage' className='flex w-full flex-col items-center'>
            <h1 className='pt-32 text-3xl font-bold tracking-tight md:text-7xl'>
                Modern <span className='bg-gradient-to-br from-[#5CAFFF] to-[#BD34FE] bg-clip-text text-transparent'>Vite</span> React App
            </h1>
        </div>
    );
};

export default MainPage;
