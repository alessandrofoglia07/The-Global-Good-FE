import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '@/utils/userPool';

const ConfirmPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [code, setCode] = useState('');

    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = searchParams.get('username');

        if (!username) {
            return alert('Username is required');
        }

        const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

        cognitoUser.confirmRegistration(code, true, (err?: Error) => {
            if (err) {
                alert(err);
            } else {
                navigate('/auth/login');
            }
        });
    };

    const handleResend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const username = searchParams.get('username');

        if (!username) {
            return alert('Username is required');
        }

        const cognitoUser = new CognitoUser({ Username: username.toLowerCase(), Pool: userPool });

        cognitoUser.resendConfirmationCode((err?: Error) => {
            if (err) {
                alert(err);
            }
        });
    };

    return (
        <div className='grid h-full w-full place-items-center'>
            <form className='flex flex-col gap-2 *:p-4 *:text-black' onSubmit={handleConfirm}>
                <input name='code' placeholder='Confirmation code' onChange={(e) => setCode(e.target.value)} value={code} />
                <button type='submit'>Confirm</button>
                <button type='button' onClick={handleResend}>
                    Resend
                </button>
            </form>
        </div>
    );
};

export default ConfirmPage;