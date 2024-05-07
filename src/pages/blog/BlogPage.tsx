import React, { useState, useEffect, useContext } from 'react';
import Navbar from '@/components/Navbar';
import axios from '@/api/axios';
import BlogPost from '@/components/BlogPost';
import { BlogPost as BlogPostT } from '@/types';
import Spinner from '@/components/Spinner';
import { Dialog } from '@headlessui/react';
import LoginRequirer from '@/components/LoginRequirer';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { AccountContext } from '@/context/Account';
import authAxios from '@/api/authAxios';

const BlogPage: React.FC = () => {
    const { getSession } = useContext(AccountContext);

    const [posts, setPosts] = useState<BlogPostT[] | undefined>(undefined);
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
    const [session, setSession] = useState<CognitoUserSession | null>(null);

    useEffect(() => {
        getSession().then((res) => setSession(res));
    }, []);

    const fetchPosts = async () => {
        try {
            let res;
            if (session) {
                res = await authAxios.get('/blog?fullPost=false');
            } else {
                res = await axios.get('/blog?fullPost=false');
            }
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [session]);

    return (
        <div className='w-full'>
            <Navbar />
            <div className='h-16 w-full' />
            <h3 className='mt-8 w-full text-center text-5xl font-extrabold tracking-tighter text-taupe'>TheGlobalGood</h3>
            <h1 className='custom-underline mx-auto mb-8 mt-4 w-max text-6xl font-extrabold tracking-tight text-taupe'>Our Blog</h1>
            <div className='mx-auto my-8 h-px w-3/5 bg-taupe/40' />
            <div className='grid grid-cols-1 gap-8 p-8 px-[5vw] md:grid-cols-2 lg:grid-cols-3'>
                {posts === undefined ? (
                    <Spinner className='mx-auto mt-12 md:col-span-2 lg:col-span-3' />
                ) : (
                    posts.map((post) => <BlogPost openModal={() => setLoginModalOpen(true)} key={post.theme + post.createdAt} blogPost={post} />)
                )}
            </div>
            <Dialog onClose={() => setLoginModalOpen(false)} open={loginModalOpen}>
                <div className='fixed inset-0 z-[60] bg-black/25' />
                <Dialog.Panel className='animate-zoom-in-center fixed left-1/2 top-1/2 z-[61] max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-neutral-50 p-8 sm:w-[80vw] md:w-[60vw] lg:w-[50vw]'>
                    <LoginRequirer text='You need to log in to like this post.' />
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default BlogPage;
