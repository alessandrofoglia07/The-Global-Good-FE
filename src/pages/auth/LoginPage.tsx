import React, { useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import userPool from '@/utils/userPool';

interface Form {
    username: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<Form>({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cognitoUser = new CognitoUser({
            Username: form.username,
            Pool: userPool
        });

        const authenticationDetails = new AuthenticationDetails({
            Username: form.username,
            Password: form.password
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: () => {
                navigate('/');
            },
            onFailure: (err) => {
                alert(err);
            }
        });
    };

    return (
        <div className='grid h-full w-full place-items-center'>
            <form className='flex flex-col gap-2 *:p-4 *:text-black' onSubmit={handleLogin}>
                <input name='username' placeholder='Username' onChange={handleChange} value={form.username} />
                <input name='password' type='password' placeholder='Password' onChange={handleChange} value={form.password} />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
