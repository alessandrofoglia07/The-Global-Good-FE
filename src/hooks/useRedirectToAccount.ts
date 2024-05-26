import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AccountContext } from '@/context/Account';

const useRedirectToAccount = () => {
    const navigate = useNavigate();
    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await getSession();
                if (session) navigate('/account', { replace: true });
            } catch (err) {
                return;
            }
        };

        checkAuth();
    }, [getSession, navigate]);
};

export default useRedirectToAccount;
