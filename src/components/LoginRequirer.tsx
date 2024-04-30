import React from 'react';

interface Props {
    text: string;
    id?: string;
    className?: string;
}

const LoginRequirer: React.FC<Props> = ({ text, id, className }: Props) => {
    return (
        <div id={id} className={`flex w-full flex-col items-center ${className}`}>
            <h3 className='text-xl font-semibold text-taupe'>{text}</h3>
            <a className='mt-7 w-2/3 rounded-md bg-darktan px-4 py-2 text-center font-semibold text-taupe' href='/account/signin'>
                Log in
            </a>
            <p className='mt-5 text-taupe'>
                Don't have an account?{' '}
                <a href='/account/register' className='underline'>
                    Register now!
                </a>
            </p>
        </div>
    );
};

export default LoginRequirer;
