import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AccountContext } from '@/context/Account';

const ProtectedRoutes: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await getSession();
                setIsAuth(!!session);
            } catch (err) {
                setIsAuth(false);
            }
        };

        checkAuth();
    }, [getSession]);

    return isAuth ? <Outlet /> : <Navigate to='/auth/login' replace />;
};

export default ProtectedRoutes;
