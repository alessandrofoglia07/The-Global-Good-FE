import React from 'react';
import { Review as ReviewT } from '@/types';
import Rating from './Rating';

interface Props {
    review: ReviewT;
    displayProductLink?: boolean;
}

const Review: React.FC<Props> = ({ review, displayProductLink }: Props) => {
    const handleShowFullText = (e: React.MouseEvent<HTMLSpanElement>) => {
        const target = e.target as HTMLSpanElement;
        target.classList.toggle('overflow-hidden');
        target.classList.toggle('text-ellipsis');
        target.classList.toggle('text-nowrap');
    };

    return (
        <div key={review.reviewId} className='mb-4'>
            <h3 className='flex text-lg font-semibold text-taupe md:items-center md:justify-between md:gap-4 -md:flex-col-reverse'>
                <span className='flex max-w-[calc(3/4*100%)] items-center gap-4'>
                    <span onClick={handleShowFullText} className='cursor-default overflow-hidden text-ellipsis text-nowrap'>
                        {review.reviewTitle}
                    </span>{' '}
                    <Rating rating={review.rating} />
                </span>
                {displayProductLink ? (
                    <a href={`/shop/${review.productCollection}/${review.productName}`} className='text-base text-taupe/50'>
                        {review.productName}
                    </a>
                ) : (
                    <span className='text-base text-taupe/50'>@{review.username}</span>
                )}
            </h3>
            <p className='mt-1 text-lg text-taupe/80'>{review.reviewText}</p>
        </div>
    );
};

export default Review;
