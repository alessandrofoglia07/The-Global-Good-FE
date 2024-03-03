import React from 'react';

const MainPage: React.FC = () => {
    return (
        <div id='MainPage' className='flex w-full flex-col items-center *:py-4 *:font-bold *:underline'>
            <a href='/auth/signup'>Sign up page</a>
            <a href='/auth/login'>Login page</a>
        </div>
    );
};

export default MainPage;
