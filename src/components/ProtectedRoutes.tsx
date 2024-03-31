import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AccountContext } from '@/context/Account';

const ProtectedRoutes: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
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

    if (isAuth === null) return null;

    return isAuth ? <Outlet /> : <Navigate to='/account/signin' replace />;
};

export default ProtectedRoutes;
