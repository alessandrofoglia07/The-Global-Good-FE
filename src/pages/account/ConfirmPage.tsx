import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '@/utils/userPool';
import Logo from '@/components/Logo';
import Navbar from '@/components/Navbar';
import formatErrMsg from '@/utils/addDotAtStringEnd';

const ConfirmPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [resendCodeMsg, setResendCodeMsg] = useState<string | null>(null);
    const [code, setCode] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = searchParams.get('username');
        if (!username) {
            return setErrMsg('Username is required.');
        }

        const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

        cognitoUser.confirmRegistration(code, true, (err?: Error) => {
            if (err) {
                setErrMsg(formatErrMsg(err.message));
            } else {
                setErrMsg(null);
                navigate('/account/login');
            }
        });
    };

    const handleResend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const username = searchParams.get('username');
        if (!username) {
            return setErrMsg('Username is required.');
        }

        const cognitoUser = new CognitoUser({ Username: username.toLowerCase(), Pool: userPool });

        cognitoUser.resendConfirmationCode((err?: Error) => {
            if (err) {
                setResendCodeMsg(formatErrMsg(err.message));
            } else {
                setResendCodeMsg('Code resent successfully.');
            }
        });
    };

    useEffect(() => {
        setResendCodeMsg(null);
    }, [errMsg]);

    return (
        <div className='grid h-full w-full place-items-center'>
            <Navbar />
            <div className='mt-20 h-10 w-full bg-gradient-to-b from-slate-100 to-slate-50' />
            <section className='relative h-[calc(100vh-7.5rem)] w-full bg-slate-50'>
                <form
                    autoComplete='off'
                    spellCheck={false}
                    className='absolute left-1/2 top-1/2 flex w-[30rem] max-w-[90vw] -translate-x-1/2 -translate-y-[calc(50%+5rem)] flex-col gap-4'
                    onSubmit={handleConfirm}>
                    <Logo className='mb-8 justify-center text-4xl text-taupe *:text-5xl' />
                    <h2 className='relative mb-2 w-full select-none text-3xl font-bold tracking-tight text-taupe'>Sign in</h2>
                    <input
                        name='code'
                        placeholder='Confirmation code'
                        type='text'
                        className='w-full rounded-md border border-gray-300 px-6 py-3 text-xl text-taupe outline-tan'
                        onChange={handleChange}
                        value={code}
                        autoFocus
                    />
                    {errMsg && <p className='text-red-500'>{errMsg}</p>}
                    <p className='text-center'>
                        Having trouble?{' '}
                        <span onClick={handleResend} className='cursor-pointer text-taupe hover:underline'>
                            Resend code
                        </span>
                    </p>
                    {resendCodeMsg && <p className='-mt-2 text-center text-taupe'>{resendCodeMsg}</p>}
                    <button type='submit' className='mt-2 w-full rounded-md bg-tan px-4 py-2 text-xl text-taupe'>
                        Confirm
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ConfirmPage;
