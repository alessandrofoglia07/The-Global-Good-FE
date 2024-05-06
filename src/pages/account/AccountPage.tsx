import React, { useContext, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AccountContext } from '@/context/Account';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { Review as ReviewT } from '@/types';
import authAxios from '@/api/authAxios';
import Review from '@/components/Review';
import Footer from '@/components/Footer';

interface User {
    'cognito:username': string;
    email: string;
    email_verified: boolean;
}

const AccountPage: React.FC = () => {
    const { getSession } = useContext(AccountContext);
    const navigate = useNavigate();

    const [user, setUser] = useState<User | undefined>(undefined);
    const [reviews, setReviews] = useState<ReviewT[] | undefined>(undefined);

    const fetchSession = async () => {
        try {
            const session = await getSession();
            if (!session) return navigate('/account/signin');
            setUser(session.getIdToken().decodePayload() as User);
        } catch (err) {
            console.error(err);
            navigate('/account/signin');
        }
    };

    const fetchLatestReviews = async () => {
        try {
            if (!user) return;
            const res = await authAxios.get(`/reviews/username?username=${user['cognito:username']}&limit=3`);
            setReviews(res.data.reviews);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSession();
    }, []);

    useEffect(() => {
        fetchLatestReviews();
    }, [user]);

    return (
        <div className='w-full'>
            <Navbar />
            <div className='mt-20 h-10 w-full' />
            <div className='h-full min-h-screen w-full'>
                {!user ? (
                    <Spinner className='mx-auto py-16' />
                ) : (
                    <>
                        <div className='relative left-1/2 flex h-max w-screen max-w-4xl -translate-x-1/2 flex-col'>
                            <h1 className='text-left text-4xl font-bold tracking-tight text-taupe -md:px-6'>Welcome {user['cognito:username'] || 'User'}</h1>
                            <section className='mt-8 grid space-y-4 rounded-lg border border-gray-50 bg-white px-8 py-6 shadow-sm *:text-left *:tracking-tight *:text-taupe md:grid-cols-2'>
                                <h3 className='text-xl font-bold tracking-tight '>Email</h3>
                                <p className='text-lg font-normal'>{user.email}</p>
                                <h3 className='text-xl font-bold'>Email Verified</h3>
                                <p className='text-lg font-normal'>{user.email_verified ? 'Yes' : 'No'}</p>
                            </section>
                            <section className='mt-8 rounded-lg border border-gray-50 bg-white px-8 py-6 shadow-sm'>
                                <h2 className='text-2xl font-bold tracking-tight text-taupe'>Latest Reviews</h2>
                                <div className='mt-4 space-y-4'>
                                    {reviews !== undefined ? (
                                        reviews.length > 0 ? (
                                            reviews.map((review) => <Review key={review.reviewId} review={review} displayProductLink={true} />)
                                        ) : (
                                            <p className='mt-2 text-lg font-normal'>No reviews found</p>
                                        )
                                    ) : (
                                        <Spinner className='mx-auto my-8' />
                                    )}
                                </div>
                            </section>
                            <section className='mt-8 rounded-lg border border-gray-50 bg-white px-8 py-6 shadow-sm'>
                                <h2 className='text-2xl font-bold tracking-tight text-taupe'>Latest Orders</h2>
                                <p className='mt-2 text-lg font-normal'>No orders found</p>
                            </section>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AccountPage;
