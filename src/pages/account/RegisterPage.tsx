import React, { useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { localStorageUserPool } from '@/utils/userPool';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import { LuEye as ShowPassIcon, LuEyeOff as HidePassIcon } from 'react-icons/lu';
import { UsernameSchema, EmailSchema, PasswordSchema } from '@/utils/schemas/authSchemas';
import formatErrMsg from '@/utils/addDotAtStringEnd';
import useRedirectToAccount from '@/hooks/useRedirectToAccount';

interface Form {
    username: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const navigate = useNavigate();
    useRedirectToAccount();

    const [form, setForm] = useState<Form>({
        username: '',
        email: '',
        password: ''
    });
    const [showPass, setShowPass] = useState<boolean>(false);
    const [err, setErr] = useState<Record<keyof Form, string | null>>({
        username: null,
        email: null,
        password: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateFieldsLocal = () => {
        const validateUsername = UsernameSchema.safeParse(form.username);
        const validateEmail = EmailSchema.safeParse(form.email);
        const validatePassword = PasswordSchema.safeParse(form.password);

        let canContinue = true;

        if (!validateUsername.success) {
            const newErr = validateUsername.error.errors[0]?.message || null;
            setErr((prev) => ({ ...prev, username: newErr !== null ? formatErrMsg(newErr) : null }));
            canContinue = false;
        } else setErr((prev) => ({ ...prev, username: null }));
        if (!validateEmail.success) {
            const newErr = validateEmail.error.errors[0]?.message || null;
            setErr((prev) => ({ ...prev, email: newErr !== null ? formatErrMsg(newErr) : null }));
            canContinue = false;
        } else setErr((prev) => ({ ...prev, email: null }));
        if (!validatePassword.success) {
            const newErr = validatePassword.error.errors[0]?.message || null;
            setErr((prev) => ({ ...prev, password: newErr !== null ? formatErrMsg(newErr) : null }));
            canContinue = false;
        } else setErr((prev) => ({ ...prev, password: null }));

        return canContinue;
    };

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateFieldsLocal()) return;

        const email = new CognitoUserAttribute({ Name: 'email', Value: form.email });

        localStorageUserPool.signUp(form.username, form.password, [email], [], (err?: Error) => {
            if (err) {
                setErr((prev) => ({ ...prev, password: formatErrMsg(err.message) }));
            } else {
                navigate(`/account/confirm?username=${form.username}`);
            }
        });
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
                    onSubmit={handleSignUp}>
                    <Logo className='mb-8 justify-center text-4xl text-taupe *:text-5xl' />
                    <h2 className='relative mb-2 w-full select-none text-3xl font-bold tracking-tight text-taupe'>Register</h2>
                    <div>
                        <input
                            name='username'
                            placeholder='Username'
                            className='w-full rounded-md border border-gray-300 px-6 py-3 text-xl text-taupe outline-tan'
                            onChange={handleChange}
                            value={form.username}
                            autoFocus
                        />
                        {err.username && <p className='-mb-1 mt-1 text-red-500'>{err.username}</p>}
                    </div>
                    <div>
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            className='w-full rounded-md border border-gray-300 px-6 py-3 text-xl text-taupe outline-tan'
                            onChange={handleChange}
                            value={form.email}
                        />
                        {err.email && <p className='-mb-1 mt-1 text-red-500'>{err.email}</p>}
                    </div>
                    <div>
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
                        {err.password && <p className='-mb-1 mt-1 text-red-500'>{err.password}</p>}
                    </div>
                    <button type='submit' className='mt-2 w-full rounded-md bg-tan px-4 py-2 text-xl text-taupe'>
                        Register
                    </button>
                    <div>
                        <p className='mt-4 text-center text-xl text-taupe'>
                            Already have an account?{' '}
                            <a className='cursor-pointer text-tan' href='/account/signin'>
                                Sign in
                            </a>
                        </p>
                    </div>
                </form>
            </section>
        </div>
        // <div className='grid h-full w-full place-items-center'>
        //     <form className='flex flex-col gap-2 *:p-4 *:text-black' onSubmit={handleSignUp}>
        //         <input name='username' placeholder='Username' onChange={handleChange} value={form.username} />
        //         <input name='email' type='email' placeholder='Email' onChange={handleChange} value={form.email} />
        //         <input name='password' type='password' placeholder='Password' onChange={handleChange} value={form.password} />
        //         <button type='submit'>Sign Up</button>
        //     </form>
        // </div>
    );
};

export default RegisterPage;
