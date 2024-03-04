import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        const authenticationDetails = new AuthenticationDetails({
            Username: form.username,
            Password: form.password
        });

        const UserPoolId = import.meta.env.VITE_AWS_USER_POOL_ID;
        const ClientId = import.meta.env.VITE_AWS_POOL_CLIENT_ID;

        if (!UserPoolId || !ClientId) {
            throw new Error('UserPoolId and ClientId are required');
        }

        const userPool = new CognitoUserPool({ UserPoolId, ClientId });

        const userData = {
            Username: form.username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: () => {
                console.log('Success');
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
