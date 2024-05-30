import React, { useContext, useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';
import { toCollectionName } from '@/utils/toCollectionName';
import { toImgURL } from '@/utils/toImgURL';
import { useParams } from 'react-router-dom';
import { FaRegHeart as EmptyHeartIcon, FaHeart as FullHeartIcon, FaRegComment as CommentIcon } from 'react-icons/fa';
import { AccountContext } from '@/context/Account';
import { BlogPost, Comment as CommentT } from '@/types';
import authAxios from '@/api/authAxios';
import Comment from '@/components/Comment';
import LoginRequirerModal from '@/components/LoginRequirerModal';
import { commentSchema } from '@/utils/schemas/commentSchema';
import axios from '@/api/axios';
import { Helmet } from 'react-helmet';

const SpecificBlogPage: React.FC = () => {
    const { theme, createdAt } = useParams<{ theme: string; createdAt: string }>();
    const { getSession } = useContext(AccountContext);

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [writingComment, setWritingComment] = useState<string>('');
    const [errText, setErrText] = useState('');
    const [comments, setComments] = useState<CommentT[]>([]);
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
    const [loginModalText, setLoginModalText] = useState<string>('You need to log in to comment on this post.');

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWritingComment(e.target.value);
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`/blog/${theme}/${createdAt}/comments`);
            setComments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username) {
            setLoginModalOpen(true);
            setLoginModalText('You need to log in to comment on this post.');
            return;
        }

        try {
            const val = commentSchema.safeParse(writingComment);
            if (!val.success) {
                setErrText(val.error.errors[0]?.message || 'Invalid comment.');
                return;
            }
            setErrText('');

            await authAxios.post(`/blog/${theme}/${createdAt}/comment`, { text: writingComment });
            setWritingComment('');
            fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    const getSpecificBlogPost = async () => {
        try {
            const res = await authAxios.get(`/blog?theme=${theme}&createdAt=${createdAt}`);
            setBlogPost(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getSession().then((res) => {
            setUsername(res?.getAccessToken().decodePayload().username || null);
        });
        fetchComments();
    }, []);

    const handleLike = async () => {
        if (!blogPost) return;
        try {
            if (username) {
                if (blogPost.liked) {
                    setBlogPost((prev) => ({ ...prev!, liked: false, likes: prev!.likes - 1 }));
                } else {
                    setBlogPost((prev) => ({ ...prev!, liked: true, likes: prev!.likes + 1 }));
                }
            } else {
                setLoginModalOpen(true);
                setLoginModalText('You need to log in to like this post.');
                return;
            }
            await authAxios.patch(`/blog/${blogPost.theme}/${blogPost.createdAt}/like`);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getSpecificBlogPost();
    }, [theme, createdAt]);

    return (
        <div>
            <Helmet>
                <meta
                    name='description'
                    content='TheGlobalGood blog is a place where we share our thoughts, ideas, and stories about our products, our mission, and our impact. Read our blog to learn more about our products, our artisans, and our mission.'
                />
            </Helmet>
            <Navbar />
            <div className='h-20 w-full' />
            <main className='mx-auto mb-32 mt-8 flex max-w-[50rem] flex-col items-center px-8'>
                <h2 className='text-2xl font-bold text-taupe'>{theme}</h2>
                {blogPost ? (
                    <div className='flex flex-col'>
                        {blogPost.productCollection && (
                            <a href={`/shop?collection=${blogPost.productCollection}`} className='w-full text-center text-3xl font-semibold tracking-tight text-taupe'>
                                {toCollectionName(blogPost.productCollection)}
                            </a>
                        )}
                        <div className='my-4 flex items-center justify-end gap-8'>
                            <button onClick={handleLike} className='flex items-center gap-2'>
                                {blogPost.liked ? <FullHeartIcon className='text-3xl text-red-500' /> : <EmptyHeartIcon className='text-3xl' />}
                                <span className='text-2xl'>{blogPost.likes}</span>
                            </button>
                            <a href='#comment-section'>
                                <CommentIcon className='text-3xl' />
                            </a>
                        </div>
                        <img draggable='false' src={toImgURL(blogPost.img)} alt={blogPost.title} className='max-h-[30rem] w-full object-contain' />
                        <h1 className='text-4xl font-bold tracking-tight text-taupe'>{blogPost.title}</h1>
                        {blogPost.content.custom ? (
                            <>
                                {blogPost.content.paragraphs.map((para, i) => (
                                    <div key={i}>
                                        <h4 className='text-xl font-semibold text-taupe'>{para.title}</h4>
                                        <p className='text-lg text-taupe'>{para.content}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <p className='mt-4 text-xl'>{blogPost.content.introduction}</p>
                                <h4 className='mt-8 text-3xl font-bold tracking-tight text-taupe'>The story behind the product</h4>
                                <p className='mt-4 text-xl text-taupe'>{blogPost.content.story}</p>
                                <h4 className='mt-8 text-3xl font-bold tracking-tight text-taupe'>How this product helps our mission</h4>
                                <p className='mt-4 text-xl text-taupe'>{blogPost.content.fairTradeImpact}</p>
                            </>
                        )}
                        <div className='my-4 flex items-center justify-end gap-8'>
                            <button onClick={handleLike} className='flex items-center gap-2'>
                                {blogPost.liked ? <FullHeartIcon className='text-3xl text-red-500' /> : <EmptyHeartIcon className='text-3xl' />}
                                <span className='text-2xl'>{blogPost.likes}</span>
                            </button>
                            <a href='#comment-section'>
                                <CommentIcon className='text-3xl' />
                            </a>
                        </div>
                        <h2 className='my-8 text-3xl font-bold text-taupe'>Comments</h2>
                        {comments && comments.length > 0 ? (
                            comments.map((comment, i) => <Comment comment={comment} key={i} />)
                        ) : (
                            <h4 className='py-16 text-center text-2xl text-taupe'>
                                No one has already shared their idea on this.
                                <br /> You can be{' '}
                                <a className='underline' href='#comment-section'>
                                    the first
                                </a>
                                !
                            </h4>
                        )}
                        <form id='comment-section' className='mt-8 rounded-lg bg-white/80 p-8 shadow-sm' onSubmit={handleSubmit}>
                            <div className='flex w-full flex-col gap-4'>
                                <textarea
                                    className='h-32 w-full resize-none rounded-md bg-inherit text-lg text-taupe focus:outline-none'
                                    placeholder='Write your comment here'
                                    name='text'
                                    value={writingComment}
                                    onChange={handleCommentChange}
                                />
                                <p className='text-red-400'>{errText}</p>
                                <button
                                    className='mb-4 w-full rounded-md bg-darktan/90 px-4 py-3 font-bold uppercase tracking-wide text-white transition-colors hover:bg-darktan'
                                    type='submit'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <Spinner className='mx-auto mt-[25vh]' />
                )}
                <LoginRequirerModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} text={loginModalText} />
            </main>
            <Footer />
        </div>
    );
};

export default SpecificBlogPage;
