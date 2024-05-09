import React from 'react';
import { Comment as CommentT } from '@/types';

interface Props {
    comment: CommentT;
}

const Comment: React.FC<Props> = ({ comment }: Props) => {
    return (
        <div className='mb-4'>
            <h3 className='flex text-lg font-semibold text-taupe md:items-center md:justify-between md:gap-4 -md:flex-col-reverse'>
                <span className='text-base text-taupe/50'>@{comment.username}</span>
            </h3>
            <p className='mt-1 text-lg text-taupe/80'>{comment.content}</p>
        </div>
    );
};

export default Comment;
