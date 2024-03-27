import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SignInPage from '@/pages/account/SignInPage';
import RegisterPage from '@/pages/account/RegisterPage';
import ConfirmPage from '@/pages/account/ConfirmPage';
import ProtectedRoutes from './ProtectedRoutes';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<></>} />
            <Route path='/product/:id' element={<></>} />

            {/* Info pages */}
            <Route path='/pages/about-us' element={<></>} />
            <Route path='/pages/privacy-policy' element={<></>} />
            <Route path='/pages/terms-conditions' element={<></>} />

            {/* Account routes */}
            <Route path='/account/signin' element={<SignInPage />} />
            <Route path='/account/register' element={<RegisterPage />} />
            <Route path='/account/confirm' element={<ConfirmPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
                <Route path='/account' element={<></>} />
                <Route path='/checkout' element={<></>} />
            </Route>

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default App;
