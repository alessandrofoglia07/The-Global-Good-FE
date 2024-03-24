import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import ConfirmPage from '@/pages/auth/ConfirmPage';
import ProtectedRoutes from './ProtectedRoutes';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<></>} />
            <Route path='/shop/collections/:collection' element={<></>} />
            <Route path='/product/:id' element={<></>} />

            {/* Info pages */}
            <Route path='/pages/about-us' element={<></>} />
            <Route path='/pages/privacy-policy' element={<></>} />
            <Route path='/pages/terms-conditions' element={<></>} />

            {/* Auth routes */}
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/signup' element={<SignUpPage />} />
            <Route path='/auth/confirm' element={<ConfirmPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
                <Route path='/account' element={<></>} />
                <Route path='/checkout' element={<></>} />
            </Route>

            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default App;
