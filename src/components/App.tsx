import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SignInPage from '@/pages/account/SignInPage';
import RegisterPage from '@/pages/account/RegisterPage';
import ConfirmPage from '@/pages/account/ConfirmPage';
import ProtectedRoutes from './ProtectedRoutes';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import AccountPage from '@/pages/account/AccountPage';
import BlogPage from '@/pages/blog/BlogPage';
import SpecificBlogPage from '@/pages/blog/SpecificBlogPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/shop/:collection/:name' element={<ProductPage />} />

            <Route path='/blog' element={<BlogPage />} />
            <Route path='/blog/:theme/:createdAt' element={<SpecificBlogPage />} />

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
