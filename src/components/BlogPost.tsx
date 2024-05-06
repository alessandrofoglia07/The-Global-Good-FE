import React, { useContext, useEffect, useState } from 'react';
import { type BlogPost } from '@/types';
import { toImgURL } from '@/utils/toImgURL';
import { FaRegHeart as EmptyHeartIcon, FaHeart as FullHeartIcon, FaRegComment as CommentIcon } from 'react-icons/fa';
import { AccountContext } from '@/context/Account';
import authAxios from '@/api/authAxios';

interface Props {
    blogPost: BlogPost;
    openModal: () => void;
}

const BlogPost: React.FC<Props> = ({ blogPost, openModal }: Props) => {
    const { getSession } = useContext(AccountContext);

    const [likes, setLikes] = useState<string[]>(blogPost.likes);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        getSession().then((res) => setUsername(res?.getAccessToken().decodePayload().username || null));
    }, []);

    const link = `/blog/${blogPost.theme}/${blogPost.createdAt}`;

    const handleLikeBtnClick = async () => {
        const session = await getSession();
        if (!session) return openModal();

        try {
            const res = await authAxios.patch(`/blog/${blogPost.theme}/${blogPost.createdAt}/like`);
            if (res.status === 200) {
                if (username) {
                    if (likes.includes(username)) {
                        setLikes((prev) => prev.filter((like) => like !== username));
                    } else {
                        setLikes((prev) => [...prev, username]);
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

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
            <div className='my-4 flex items-center justify-end gap-4'>
                <button onClick={handleLikeBtnClick} className='flex items-center gap-2'>
                    {username && likes.includes(username) ? <FullHeartIcon className='text-xl text-red-500' /> : <EmptyHeartIcon className='text-xl' />}
                    <span>{likes.length}</span>
                </button>
                <a href={link + '#comment-section'}>
                    <CommentIcon className='text-xl' />
                </a>
            </div>
        </div>
    );
};

export default BlogPost;
