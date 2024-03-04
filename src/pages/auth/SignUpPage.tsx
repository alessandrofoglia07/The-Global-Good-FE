import React, { useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import userPool from '@/utils/userPool';

interface Form {
    username: string;
    email: string;
    password: string;
}

const SignUpPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<Form>({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = new CognitoUserAttribute({ Name: 'email', Value: form.email });

        userPool.signUp(form.username, form.password, [email], [], (err?: Error) => {
            if (err) {
                alert(err);
            } else {
                navigate(`/auth/confirm?username=${form.username}`);
            }
        });
    };

    return (
        <div className='grid h-full w-full place-items-center'>
            <form className='flex flex-col gap-2 *:p-4 *:text-black' onSubmit={handleSignUp}>
                <input name='username' placeholder='Username' onChange={handleChange} value={form.username} />
                <input name='email' type='email' placeholder='Email' onChange={handleChange} value={form.email} />
                <input name='password' type='password' placeholder='Password' onChange={handleChange} value={form.password} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
