import React, { useState } from 'react';

interface Form {
    username: string;
    email: string;
    password: string;
}

const SignUpPage = () => {
    const [form, setForm] = useState<Form>({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className='grid h-full w-full place-items-center'>
            <form className='flex flex-col gap-2 *:p-4 *:text-black'>
                <input name='username' placeholder='Username' onChange={handleChange} value={form.username} />
                <input name='email' type='email' placeholder='Email' onChange={handleChange} value={form.email} />
                <input name='password' type='password' placeholder='Password' onChange={handleChange} value={form.password} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
