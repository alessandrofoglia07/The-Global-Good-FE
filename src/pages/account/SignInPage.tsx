import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '@/context/Account';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import { LuEye as ShowPassIcon, LuEyeOff as HidePassIcon } from 'react-icons/lu';
import formatErrMsg from '@/utils/addDotAtStringEnd';
import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import Checkbox from '@/components/Checkbox';

interface Form {
    usernameOrEmail: string;
    password: string;
    rememberMe: boolean;
}

const SignInPage = () => {
    const navigate = useNavigate();
    const { authenticate } = useContext(AccountContext);
    useRedirectToAccount();

    const [showPass, setShowPass] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');
    const [form, setForm] = useState<Form>({
        usernameOrEmail: '',
        password: '',
        rememberMe: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await authenticate(form.usernameOrEmail, form.password, form.rememberMe ? localStorage : sessionStorage);
            navigate('/');
        } catch (err) {
            if (err instanceof Error) setErrMsg(formatErrMsg(err.message));
            else if (typeof err === 'string') setErrMsg(formatErrMsg(err));
            else setErrMsg('An error occurred.');
        }
    };

    return (
        <div className='grid h-full w-full place-items-center'>
            <Navbar />
            <div className='mt-20 h-10 w-full bg-gradient-to-b from-slate-100 to-slate-50' />
            <section className='relative h-[calc(100vh-7.5rem)] w-full bg-slate-50'>
                <form
                    autoComplete='off'
                    spellCheck={false}
                    className='absolute left-1/2 top-1/2 flex w-[30rem] max-w-[90vw] -translate-x-1/2 -translate-y-[calc(50%+5rem)] flex-col gap-4'
                    onSubmit={handleSignIn}>
                    <Logo className='mb-8 justify-center text-4xl text-taupe *:text-5xl' />
                    <h2 className='relative mb-2 w-full select-none text-3xl font-bold tracking-tight text-taupe'>Sign in</h2>
                    <input
                        name='usernameOrEmail'
                        placeholder='Username or Email'
                        className='w-full rounded-md border border-gray-300 px-6 py-3 text-xl text-taupe outline-tan'
                        onChange={handleChange}
                        value={form.usernameOrEmail}
                        autoFocus
                    />
                    <div className='flex w-full items-center rounded-md border border-gray-300 bg-white py-3 pl-6 pr-1 text-xl text-taupe outline-1 focus-within:outline focus-within:outline-tan'>
                        <input
                            name='password'
                            type={showPass ? 'text' : 'password'}
                            placeholder='Password'
                            className='w-5/6 text-xl text-taupe focus-visible:outline-none'
                            onChange={handleChange}
                            value={form.password}
                        />
                        <div className='grid h-full w-1/6 place-items-center px-1'>
                            <button
                                aria-label='toggle-password-visibility'
                                type='button'
                                onKeyDown={(e) => e.key === 'Enter' && setShowPass((prev) => !prev)}
                                className='aspect-square h-full rounded-full text-center outline-offset-4'>
                                {showPass ? (
                                    <HidePassIcon className='text-2xl' onClick={() => setShowPass(false)} />
                                ) : (
                                    <ShowPassIcon className='text-2xl' onClick={() => setShowPass(true)} />
                                )}
                            </button>
                        </div>
                    </div>
                    <p className='text-red-500'>{errMsg}</p>
                    <div className='inline-flex items-center'>
                        <Checkbox
                            checked={form.rememberMe}
                            onChange={() => setForm((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}
                            label='Remember Me'
                            id='check'
                            labelClassName='!text-taupe text-xl relative top-0.5'
                        />
                    </div>
                    <button type='submit' className='mt-2 w-full rounded-md bg-tan px-4 py-2 text-xl text-taupe'>
                        Sign in
                    </button>
                    <div>
                        <p className='mt-4 text-center text-xl text-taupe'>
                            Don't have an account?{' '}
                            <a className='cursor-pointer text-tan' href='/account/register'>
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SignInPage;
