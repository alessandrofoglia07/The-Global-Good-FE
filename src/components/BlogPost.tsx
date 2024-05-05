import React from 'react';
import { type BlogPost } from '@/types';
import { toImgURL } from '@/utils/toImgURL';

interface Props {
    blogPost: BlogPost;
}

const BlogPost: React.FC<Props> = ({ blogPost }: Props) => {
    const link = `/blog/${blogPost.theme}/${blogPost.createdAt}`;

    return (
        <div className='mx-auto max-w-[30rem] rounded-lg bg-white px-6 pb-8 pt-4 shadow-sm'>
            <a href={link}>
                <img src={toImgURL(blogPost.img)} draggable='false' alt={blogPost.title} className='max-h-64 w-full rounded-lg object-contain' />
            </a>
            <a className='h-min w-min' href={link}>
                <h1 className='mt-4 text-xl font-bold tracking-tight'>{blogPost.title}</h1>
            </a>
            <p className='mt-2 text-sm text-gray-500'>{blogPost.theme}</p>
            <p className='mt-2 line-clamp-3 tracking-wide text-taupe/90'>{blogPost.content.custom === true ? blogPost.content.paragraphs[0]?.content : blogPost.content.introduction}</p>
            <p className='mt-2 text-sm text-gray-500'>{new Date(blogPost.createdAt).toDateString()}</p>
        </div>
    );
};

export default BlogPost;
