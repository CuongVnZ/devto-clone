/* eslint-disable react/no-unescaped-entities */
import { BookmarkBorderOutlined, FavoriteBorderOutlined, ModeCommentOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Header from '~/components/Header';
import { api } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';

import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function Component() {
    const session = useSession();
    const user = session.data?.user;

    const router = useRouter();
    const id = router.query.id as string;
    
    const commentMutation = api.comment.create.useMutation();
    const { data: blog, isSuccess } = api.blog.getBySlug.useQuery(id);

    const [date, setDate] = useState("July 16")
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (blog && isSuccess) {
            const tmp = new Date(blog.createdAt)
            setDate(tmp.toDateString())
        }
    }, [blog, isSuccess])

    const handleComment = () => {
        if (blog && comment.length > 0) {
            const res = commentMutation.mutate({ content: comment, blogId: blog.id })
            // setComments([...comments, res])
            setComment("")
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-10 mb-4">
                <Header />
                <main className="md:container pt-16 ">
                    <div className="flex gap-4">
                        {/* Left Sidebar */}
                        <div className="w-16 p-2 fixed mt-10 hidden md:block">
                            <div className="flex flex-col items-center space-y-4">
                                <button className="p-2 flex flex-col items-center">
                                    <FavoriteBorderOutlined className='text-gray-700 hover:text-red-500' />
                                    <span className='mt-2 text-sm text-muted-foreground'>{blog?._count.comments ?? <Skeleton />}</span>
                                </button>
                                <button className="p-2 flex flex-col items-center">
                                    <ModeCommentOutlined className='text-gray-700 hover:text-yellow-500' />
                                    <span className='mt-2 text-sm text-muted-foreground'>{blog?._count.comments ?? <Skeleton />}</span>
                                </button>
                                <button className="p-2 flex flex-col items-center">
                                    <BookmarkBorderOutlined className='text-gray-700 hover:text-blue-500' />
                                    <span className='mt-2 text-sm text-muted-foreground'>{blog?._count.comments ?? <Skeleton />}</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-grow w-9/12 md:ml-16">
                            <div className="bg-white rounded-lg border mt-2">
                                {blog && <img src={"https://devto-clone.s3.amazonaws.com/cover/" + blog.id + "." + blog.coverExtension} alt="Cover Image" className="w-full h-72 object-cover rounded-t-lg" />}
                                <div className='px-12 pt-8'>                                    
                                    <div className="flex items-center mb-4 justify-between">
                                        <div className='flex'>
                                            <Avatar className="w-10 h-10 rounded-full">
                                                <AvatarImage src={blog?.createdBy.image ?? ""} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-2">
                                                <Link href={"/user/" + blog?.createdBy.id} passHref>
                                                    <h2 className="text-md font-semibold hover:text-indigo-700">{blog?.createdBy.fullName ?? <Skeleton width={64}/>}</h2>
                                                    <p className="text-gray-600 text-sm">
                                                        {blog?.createdBy.name ? date : <Skeleton width={128}/>}
                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                        {
                                        user?.id === blog?.createdBy.id &&
                                        <>
                                        <div className='flex'>
                                            <div className="flex ml-2 bg-amber-50 p-1 border border-amber-100 rounded-lg text-gray-700">
                                                <Link href={"/edit/" + blog?.id}>
                                                    <button className="text-sm hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm">
                                                        <span>Edit</span>
                                                    </button>
                                                </Link>
                                                <button className="text-sm hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm">
                                                    <span>Manage</span>
                                                </button>
                                                <button className="text-sm hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm">
                                                    <span>Stats</span>
                                                </button>
                                            </div>
                                        </div>
                                        </>
                                        }
                                    </div>
                                    <div className="flex space-x-2 mb-4">
                                        {blog ? <>
                                        <span className="flex items-center space-x-1">
                                            <span role="img" aria-label="heart">❤️</span> <span>28</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <span role="img" aria-label="unicorn">🦄</span> <span>2</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <span role="img" aria-label="astonished">😲</span> <span>2</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <span role="img" aria-label="high-five">🙌</span> <span>4</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <span role="img" aria-label="fire">🔥</span> <span>2</span>
                                        </span>
                                        </>: <Skeleton width={400}/>}
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog?.title ?? <Skeleton />}</h1>
                                    {/* Hashtag line */}
                                    {blog?.createdBy.name ? <>
                                    <div className="flex space-x-2">
                                        <button className="p-1 text-gray-600 text-sm rounded-lg hover:bg-yellow-200">#javascript</button>
                                        <button className="text-gray-600 text-sm">#webdev</button>
                                        <button className="text-gray-600 text-sm">#programming</button>
                                    </div>
                                    </>: <Skeleton />}
                                </div>
                                <div className='px-8'>
                                    {blog
                                    ? 
                                    <>
                                        <MdPreview editorId='preview-only' modelValue={blog?.content} previewTheme="github" language="en-US"/>
                                        <MdCatalog editorId='preview-only' scrollElement={document.body} />
                                    </>
                                    : 
                                    <Skeleton variant='rectangular' className="mx-4" height="40vh"/>}
                                </div>
                                {/* Comment Section */}
                                <div className="bg-white mt-2 border-t px-12 mb-4">
                                    <h2 className="text-xl font-semibold mt-12 mb-8">Top comments (2)</h2>
                                    <div className="mb-4 flex">
                                        <Avatar className="w-8 h-8 rounded-full">
                                            <AvatarImage src={user?.image ?? ""}/>
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col w-full ml-2'>
                                            <textarea 
                                                placeholder="Add to the discussion" 
                                                className=" p-2 border rounded-md " 
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                            <Button className="bg-indigo-600 text-white w-24 mt-2" onClick={handleComment} disabled={commentMutation.isPending}>Comment</Button>
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <div className='flex'>
                                            <Avatar className="w-8 h-8 rounded-full">
                                                <AvatarImage src={blog?.createdBy.image ?? ""} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col ml-2 w-full gap-2'>
                                            <div className='border p-2 rounded-md w-full'>
                                                <p className="font-semibold mb-4">Chibueze Onyekpere <span className="text-gray-600 text-sm">• Jul 21</span></p>
                                                <p className="text-gray-800 mb-4">I really love this Google IDX concept. Great article</p>
                                            </div>
                                            <div className='flex text-xs items-center gap-4 text-gray-700'>
                                                <div className=''>
                                                    <FavoriteBorderOutlined className='size-5'/>
                                                    <span className="ml-1">2 likes</span>
                                                </div>
                                                <div className=''>
                                                    <ModeCommentOutlined className='size-5'/>
                                                    <span className="ml-1">Reply</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <Avatar className="w-8 h-8 rounded-full">
                                                <AvatarImage src={blog?.createdBy.image ?? ""} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col ml-2 w-full gap-2'>
                                            <div className='border p-2 rounded-md w-full'>
                                                <p className="font-semibold mb-4">Nora <span className="text-gray-600 text-sm">• Jul 21</span></p>
                                                <p className="text-gray-800 mb-4">Thanks for the Appreciation Bro ✨</p>
                                            </div>
                                            <div className='flex text-xs items-center gap-4 text-gray-700'>
                                                <div className=''>
                                                    <FavoriteBorderOutlined className='size-5'/>
                                                    <span className="ml-1">2 likes</span>
                                                </div>
                                                <div className=''>
                                                    <ModeCommentOutlined className='size-5'/>
                                                    <span className="ml-1">Reply</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar */}
                        <div className="hidden md:block w-96 mt-2">
                            <div className="w-full max-w-md mb-4">
                                <div className="bg-black h-8 rounded-t-lg"></div>
                                <div className="bg-white rounded-b-lg border border-gray-200 p-4">
                                    <div className="flex items-start mb-2">
                                    <Avatar className="w-12 h-12 rounded-full -mt-8">
                                        <AvatarImage src={blog?.createdBy.image ?? ""}/>
                                        <AvatarFallback>{blog?.createdBy.name}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold -mt-2 ml-2">{blog?.createdBy.name}</h2>
                                    </div>
                                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700 w-full">
                                        Follow
                                    </Button>
                                    <p className="text-sm text-gray-600 my-4">{blog?.createdBy.bio ?? "404 bio not found"}</p>
                                    
                                    <div className="space-y-2">
                                    <div className='text-sm'>
                                        <h3 className="font-semibold text-gray-700">WEBSITE</h3>
                                        <p className="text-gray-600">loading</p>
                                    </div>
                                    <div className='text-sm'>
                                        <h3 className="font-semibold text-gray-700">LOCATION</h3>
                                        <p className="text-gray-600">loading</p>
                                    </div>
                                    <div className='text-sm'>
                                        <h3 className="font-semibold text-gray-700">JOINED</h3>
                                        <p className="text-gray-600">{blog?.createdBy.createdAt ? blog.createdBy.createdAt.toDateString() : ''}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg border">
                                <h2 className="text-xl font-semibold mb-4 border-b">
                                    More from <span className='text-indigo-700'>{blog?.createdBy.name ?? <Skeleton />}</span>
                                </h2>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-700 hover:underline">
                                            Are Next.js Server Actions Secure?
                                        </a>
                                        <p className="text-gray-400 text-sm">#javascript #webdev #nextjs #serveractions</p>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-700 hover:underline">
                                            How to Create a Telegram Bot Using PHP
                                        </a>
                                        <p className="text-gray-400 text-sm">#php #telegram #webdev #javascript</p>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-700 hover:underline">
                                            Single Page Applications (SPAs)
                                        </a>
                                        <p className="text-gray-400 text-sm">#spa #react #javascript #angular</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
