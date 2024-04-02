import React, { useState, useEffect, useContext } from 'react';
import { AccountContext } from '@/context/Account';
import { Navigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
    const { isAdmin } = useContext(AccountContext);

    const [admin, setAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const admin = await isAdmin();
                setAdmin(admin);
            } catch (err) {
                setAdmin(false);
            }
        };

        checkAdmin();
    }, [isAdmin]);

    if (admin === null) return null;

    if (!admin) return <Navigate to='/' replace />;

    return <div className='h-screen w-screen'>AdminPage</div>;
};

export default AdminPage;
