import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/api/axios';
import { Product, Review as ReviewT } from '@/types';
import Navbar from '@/components/Navbar';
import { toCollectionName } from '@/utils/toCollectionName';
import useWindowSize from '@/hooks/useWindowSize';
import { toImgURL } from '@/utils/toImgURL';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import shuffle from '@/utils/shuffleArr';
import { cartState } from '@/store/cart';
import { useRecoilState } from 'recoil';
import RatingButton from '@/components/RatingButton';
import { reviewSchema } from '@/utils/schemas/reviewSchemas';
import authAxios from '@/api/authAxios';
import { AccountContext } from '@/context/Account';
import Spinner from '@/components/Spinner';
import LoginRequirer from '@/components/LoginRequirer';
import Review from '@/components/Review';
import LoginRequirerModal from '@/components/LoginRequirerModal';
import { FaExclamation as Exclamation } from 'react-icons/fa';

interface WritingReview {
    title: string;
    rating: number;
    text: string;
}

const ProductPage: React.FC = () => {
    const { collection, name } = useParams<{ collection: string; name: string }>();
    const [w] = useWindowSize();
    const { getSession } = useContext(AccountContext);

    const [cart, setCart] = useRecoilState(cartState);
    const [product, setProduct] = useState<undefined | Product>(undefined);
    const [moreFromCollection, setMoreFromCollection] = useState<undefined | Product[]>(undefined);
    const [reviews, setReviews] = useState<undefined | ReviewT[]>(undefined);
    const [writingReview, setWritingReview] = useState<WritingReview>({
        title: '',
        rating: 5,
        text: ''
    });
    const [errText, setErrText] = useState<undefined | string>(undefined);
    const [auth, setAuth] = useState<'loading' | boolean>('loading');
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [blogUrl, setBlogUrl] = useState<undefined | string>(undefined);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/product/${collection}/${name}`);
            setProduct(res.data.product);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`/reviews/product?name=${name}`);
            setReviews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBlogUrl = async (product: Product | undefined) => {
        try {
            if (!product) setBlogUrl(undefined);
            const res = await axios.get(`/blog?theme=${product?.name}&productCollection=${product?.collection}&fullPost=false`);
            if (res.data.length === 0) return setBlogUrl(undefined);
            const url = `/blog/${res.data[0].theme}/${res.data[0].createdAt}`;
            setBlogUrl(url);
        } catch (err) {
            console.error(err);
            setBlogUrl(undefined);
        }
    };

    const fetchMoreFromCollection = async () => {
        try {
            const res = await axios.get(`/products?collection=${collection}&limit=5`);
            const filtered = res.data.products.filter((product: Product) => product.name !== name);
            shuffle(filtered);
            setMoreFromCollection(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        if (cart.some((item) => item.collection === product.collection && item.name === product.name)) {
            setCart(cart.map((item) => (item.collection === product.collection && item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)));
            return;
        }
        setCart([...cart, { collection: product.collection, name: product.name, quantity: 1 }]);
    };

    useEffect(() => {
        getSession()
            .then((session) => {
                if (session) setAuth(true);
                else setAuth(false);
            })
            .catch(() => setAuth(false));
    }, []);

    useEffect(() => {
        fetchProduct();
        fetchMoreFromCollection();
        fetchReviews();
    }, []);

    useEffect(() => {
        if (product) fetchBlogUrl(product);
    }, [product]);

    const handleReviewChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'title') {
            if (value.length < 50) setWritingReview({ ...writingReview, title: value });
        } else if (name === 'text') {
            if (value.length < 500) setWritingReview({ ...writingReview, text: value });
        }
    };

    const handleReviewRatingChange = (rating: number) => {
        setWritingReview({ ...writingReview, rating });
    };

    const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!auth) return setOpenLoginModal(true);

        try {
            const val = reviewSchema.safeParse(writingReview);

            if (!val.success) {
                setErrText(val.error.errors[0]?.message || 'Invalid review data');
                return;
            }

            setErrText(undefined);
            await authAxios.post(`/reviews/product?name=${name}&collection=${collection}`, {
                rating: writingReview.rating === 5 ? writingReview.rating : writingReview.rating + 1,
                reviewTitle: writingReview.title,
                reviewText: writingReview.text
            });
            fetchReviews();
            setWritingReview({ title: '', rating: 5, text: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div id='ProductPage'>
            <Navbar />
            <div className='h-16 w-full' />
            <h4 className='mt-8 w-full px-8 font-semibold capitalize text-taupe/60'>
                {w > 768 ? <a href='/shop'>Shop {'>'}</a> : ''}{' '}
                <a href={`/shop?collection=${product?.collection || collection}`}>{product?.collection ? toCollectionName(product.collection) : toCollectionName(collection || '')}</a>{' '}
                {'>'} {product?.name || name}
            </h4>
            <main className='w-full md:px-[8%]'>
                <div className='grid w-full grid-cols-1 py-8 md:grid-cols-2 md:grid-rows-2 md:space-x-16 md:px-[8%] md:py-16 lg:grid-rows-1'>
                    <div>
                        {product ? (
                            <img
                                draggable={false}
                                src={toImgURL(product.img)}
                                alt={product.name}
                                className='max-h-[40vh] w-full object-contain md:max-h-[calc((100vh-5rem-4rem-2rem-2rem)*8/10)]'
                            />
                        ) : (
                            <div className='h-[calc((100vh-5rem-4rem-2rem-2rem)*8/10)] w-full animate-pulse rounded-lg bg-taupe/10' />
                        )}
                    </div>
                    <div className='px-6 pt-8 -md:col-start-1 -md:col-end-3 -md:row-start-2'>
                        <div className='w-full max-w-[35rem]'>
                            <section>
                                {product ? (
                                    <>
                                        <h1 className='mb-4 border-b-2 pb-2 text-4xl font-bold tracking-tight'>{product.name}</h1>
                                        <h2 className='text-xl font-semibold'>$ {product.price}</h2>
                                        <div className='mb-8 mt-4 flex flex-col gap-4'>
                                            <button
                                                onClick={handleAddToCart}
                                                className='w-full rounded-md bg-darktan/90 px-4 py-3 font-bold uppercase tracking-wide text-white transition-colors hover:bg-darktan'>
                                                Add to Cart
                                            </button>
                                            <p className='text-lg text-taupe/60'>
                                                {product.availability > 100 ? (
                                                    <span className='select-none rounded-md bg-green-400 px-3 py-2 font-bold text-white'>Available ✓</span>
                                                ) : product.availability < 100 && product.availability > 0 ? (
                                                    <span className='select-none rounded-md bg-yellow-400 px-3 py-2 font-bold text-white'>Limited Stock ⚠</span>
                                                ) : (
                                                    <span className='select-none rounded-md bg-red-400 px-3 py-2 font-bold text-white'>Out of Stock ✗</span>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='mb-4 h-8 w-2/3 animate-pulse rounded-md bg-taupe/10' />
                                        <div className='mb-4 h-8 w-24 animate-pulse rounded-md bg-taupe/10' />
                                        <button onClick={handleAddToCart} disabled className='mb-4 w-full rounded-md bg-taupe/10 px-4 py-3 font-bold uppercase tracking-wide text-white'>
                                            Add to Cart
                                        </button>
                                        <div className='mb-4 h-8 w-1/2 animate-pulse rounded-md bg-taupe/10' />
                                    </>
                                )}
                            </section>
                            {product && w > 1024 && (
                                <div>
                                    <h2 className='py-1 text-xl font-semibold tracking-tight text-taupe/80'>{toCollectionName(product.collection)}</h2>
                                    <p className='text-lg text-taupe/60'>{product.description}</p>
                                    <section className='mt-8'>
                                        <h4 className='pb-2 pt-4 text-xl font-semibold text-taupe/80'>
                                            From{' '}
                                            <a href={`/shop?country=${product.countryOfOrigin}`} className='rounded-full bg-tan px-3 py-1'>
                                                {product.countryOfOrigin}
                                            </a>
                                        </h4>
                                        <h4 className='pb-4 pt-2 text-xl font-semibold text-taupe/80'>
                                            Made of{' '}
                                            {product.materials.map((material, i) => (
                                                <span key={i} className='mr-2 rounded-full bg-tan px-3 py-1'>
                                                    {material}
                                                </span>
                                            ))}
                                        </h4>
                                    </section>
                                    {blogUrl && (
                                        <section className='mt-6'>
                                            <h4 className='flex items-center gap-2 text-lg font-semibold text-taupe/80'>
                                                <Exclamation className='rounded-full text-xl text-darktan' />
                                                <span>
                                                    <span>Learn the story about this product in its</span>{' '}
                                                    <a className='underline' href={blogUrl}>
                                                        <span>blog page!</span>
                                                    </a>
                                                </span>
                                            </h4>
                                        </section>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {product && w <= 1024 && (
                        <div className='col-start-1 col-end-3 -md:px-6'>
                            <h2 className='py-1 text-xl font-semibold tracking-tight text-taupe/80'>{toCollectionName(product.collection)}</h2>
                            <p className='text-lg text-taupe/60'>{product.description}</p>
                            <section className='mt-8'>
                                <h4 className='pb-2 pt-4 text-xl font-semibold text-taupe/80'>
                                    From{' '}
                                    <a href={`/shop?country=${product.countryOfOrigin}`} className='rounded-full bg-tan px-3 py-1'>
                                        {product.countryOfOrigin}
                                    </a>
                                </h4>
                                <h4 className='pt-2 text-xl font-semibold text-taupe/80'>
                                    Made of{' '}
                                    {product.materials.map((material, i) => (
                                        <span key={i} className='mr-2 rounded-full bg-tan px-3 pt-1'>
                                            {material}
                                        </span>
                                    ))}
                                </h4>
                            </section>
                            {blogUrl && (
                                <section className='mt-6'>
                                    <h4 className='flex items-center gap-2 text-lg font-semibold text-taupe/80'>
                                        <Exclamation className='rounded-full text-xl text-darktan' />
                                        <span>
                                            <span>Learn the story about this product in its</span>{' '}
                                            <a className='underline' href={blogUrl}>
                                                <span>blog page!</span>
                                            </a>
                                        </span>
                                    </h4>
                                </section>
                            )}
                        </div>
                    )}
                </div>
                <div className='h-px w-full bg-taupe/20' />
                {product && (
                    <>
                        <div className='w-full py-8 -md:px-8'>
                            <h2 className='w-full px-8 text-center text-3xl font-bold text-taupe/80'>Our Customers' Thoughts</h2>
                            <div className='mx-auto mt-16 border-b border-taupe/20 pb-8 md:max-w-[60vw]'>
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((review) => <Review key={review.reviewId} review={review} />)
                                ) : (
                                    <h4 className='pb-8 text-center text-2xl text-taupe'>
                                        No one has shared their experience yet.
                                        <br /> You can be{' '}
                                        <a className='underline' href='#comment-on-product'>
                                            the first
                                        </a>
                                        !
                                    </h4>
                                )}
                            </div>
                            <div className='mx-auto max-w-[40rem]'>
                                {auth === 'loading' ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : auth ? (
                                    <>
                                        <h2 id='comment-on-product' className='pt-16 text-xl text-taupe'>
                                            Comment on {product.name}
                                        </h2>
                                        <form className='mt-8' onSubmit={handleReviewSubmit}>
                                            <div className='flex w-full flex-col gap-4'>
                                                <div className='flex w-full items-center justify-between'>
                                                    <input
                                                        className='w-2/3 rounded-md bg-inherit text-lg font-semibold focus:outline-none'
                                                        type='text'
                                                        placeholder='Title'
                                                        value={writingReview.title}
                                                        onChange={handleReviewChange}
                                                        name='title'
                                                    />
                                                    <RatingButton init={5} onChange={handleReviewRatingChange} />
                                                </div>
                                                <textarea
                                                    className='h-32 w-full resize-none rounded-md bg-inherit text-lg text-taupe focus:outline-none'
                                                    placeholder='Write your comment here'
                                                    name='text'
                                                    value={writingReview.text}
                                                    onChange={handleReviewChange}
                                                />
                                                <p className='text-red-400'>{errText}</p>
                                                <button
                                                    className='mb-4 w-full rounded-md bg-darktan/90 px-4 py-3 font-bold uppercase tracking-wide text-white transition-colors hover:bg-darktan'
                                                    type='submit'>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <LoginRequirer className='mt-8' id='comment-on-product' text='Sign in to comment on this product' />
                                )}
                            </div>
                        </div>
                        <div className='h-px w-full bg-taupe/20' />
                    </>
                )}
                <div className='w-full py-8'>
                    <h2 className='mt-4 w-full px-8 text-center text-3xl font-bold text-taupe/80'>
                        More from {product?.collection ? toCollectionName(product.collection) : toCollectionName(collection || '')}
                    </h2>
                    <div className='grid place-items-center gap-8 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4'>
                        {moreFromCollection ? (
                            (w > 768 ? moreFromCollection : moreFromCollection.slice(0, 2)).map((product) => <ProductCard key={product.name} product={product} />)
                        ) : (
                            <div className='h-[40vh] w-full animate-pulse rounded-lg bg-taupe/10' />
                        )}
                    </div>
                </div>
                <LoginRequirerModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} text='You need to log in to submit a review.' />
            </main>
            <Footer />
        </div>
    );
};

export default ProductPage;
