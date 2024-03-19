import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import ConfirmPage from '@/pages/auth/ConfirmPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<></>} />
            <Route path='/product/:id' element={<></>} />

            {/* Auth routes */}
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/signup' element={<SignUpPage />} />
            <Route path='/auth/confirm' element={<ConfirmPage />} />

            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default App;
