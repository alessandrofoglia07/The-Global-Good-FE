import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '@/context/Account';

interface Form {
    username: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const { authenticate } = useContext(AccountContext)!;

    const [form, setForm] = useState<Form>({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await authenticate(form.username, form.password);
            console.log('logged in', data);
            navigate('/');
        } catch (err) {
            alert(err);
        }
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
