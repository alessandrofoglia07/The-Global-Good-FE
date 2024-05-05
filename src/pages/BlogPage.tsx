import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import axios from '@/api/axios';
import BlogPost from '@/components/BlogPost';
import { BlogPost as BlogPostT } from '@/types';

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPostT[]>([]);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/blog?fullPost=false');
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='w-full'>
            <Navbar />
            <div className='h-16 w-full' />
            <h3 className='mt-8 w-full text-center text-5xl font-extrabold tracking-tighter text-taupe'>TheGlobalGood</h3>
            <h1 className='custom-underline mx-auto mb-8 mt-4 w-max text-6xl font-extrabold tracking-tight text-taupe'>Our Blog</h1>
            <div className='mx-auto my-8 h-px w-3/5 bg-taupe/40' />
            <div className='grid grid-cols-1 gap-8 p-8 px-[5vw] md:grid-cols-2 lg:grid-cols-3'>
                {posts.map((post) => (
                    <BlogPost key={post.theme + post.createdAt} blogPost={post} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
