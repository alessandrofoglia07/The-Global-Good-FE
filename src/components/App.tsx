import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SignInPage from '@/pages/account/SignInPage';
import RegisterPage from '@/pages/account/RegisterPage';
import ConfirmPage from '@/pages/account/ConfirmPage';
import ProtectedRoutes from './ProtectedRoutes';
import PrivacyPolicyPage from '@/pages/info/PrivacyPolicyPage';
import TermsConditionsPage from '@/pages/info/TermsConditionsPage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import AccountPage from '@/pages/AccountPage';
import BlogPage from '@/pages/BlogPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/shop/:collection/:name' element={<ProductPage />} />

            <Route path='/blog' element={<BlogPage />} />
            <Route path='/blog/:theme/:createdAt' element={<></>} />

            {/* Info pages */}
            <Route path='/info/privacy-policy' element={<PrivacyPolicyPage />} />
            <Route path='/info/terms-conditions' element={<TermsConditionsPage />} />

            {/* Account routes */}
            <Route path='/account/signin' element={<SignInPage />} />
            <Route path='/account/register' element={<RegisterPage />} />
            <Route path='/account/confirm' element={<ConfirmPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
                <Route path='/account' element={<AccountPage />} />
            </Route>

            <Route path='/product-imgs/*' element={<></>} />

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default App;
