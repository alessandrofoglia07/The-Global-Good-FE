import { useState, useEffect, useContext } from 'react';
import { AccountContext } from '@/context/Account';

const Status = () => {
    const { getSession, logout } = useContext(AccountContext)!;
    const [status, setStatus] = useState(false);

    useEffect(() => {
        getSession()
            .then(() => {
                setStatus(true);
            })
            .catch(() => {
                setStatus(false);
            });
    }, [getSession]);

    return (
        <div className='flex flex-col items-center gap-2'>
            {status ? 'You are logged in.' : 'You are not logged in.'}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Status;
