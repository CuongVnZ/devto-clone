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

export default function Component() {
    const session = useSession();
    const user = session.data?.user;

    const router = useRouter();
    const id = router.query.id as string;

    const { data: blog } = api.blog.getById.useQuery(id);

    if (blog == null) {
        // return <ErrorPage statusCode={404} />;
    }

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-10 mb-4">
                <Header />
                <main className="md:container pt-16 ">
                    <div className="flex">
                        {/* Left Sidebar */}
                        <div className="w-16 p-2 fixed mt-10">
                            <div className="flex flex-col items-center space-y-4">
                                <button className="p-2">
                                    <FavoriteBorderOutlined className='text-gray-700 hover:text-red-500' />
                                    <span className='mt-2 text-sm text-muted-foreground'>{blog?._count.comments ?? <Skeleton />}</span>
                                </button>
                                <button className="p-2">
                                    <ModeCommentOutlined className='text-gray-700 hover:text-yellow-500' />
                                    <span className='mt-2 text-sm text-muted-foreground'>{blog?._count.comments ?? <Skeleton />}</span>
                                </button>
                                <button className="p-2">
                                    <BookmarkBorderOutlined className='text-gray-700 hover:text-blue-500' />
                                    <span className='mt-2 text-sm text-muted-foreground'>{blog?._count.comments ?? <Skeleton />}</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-grow w-8/12 ml-16">
                            <div className="bg-white rounded-lg border">
                                <div className='px-12 pt-12'>                                    
                                    <div className="flex items-center mb-4 justify-between">
                                        <div className='flex'>
                                            <Avatar className="w-10 h-10 rounded-full">
                                                <AvatarImage src={blog?.createdBy.image ?? ""} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-2">
                                                <h2 className="text-md font-semibold">{blog?.createdBy.fullName ?? <Skeleton width={64}/>}</h2>
                                                <p className="text-gray-600 text-sm">
                                                    {blog?.createdBy.name ? "Posted on Jul 16" : <Skeleton width={128}/>}
                                                </p>
                                            </div>
                                        </div>
                                        {
                                        user?.id === blog?.createdBy.id ? (
                                        <div className='flex'>
                                            <div className="flex ml-2 bg-amber-50 p-1 border border-amber-100 rounded-lg text-gray-700">
                                                <button className="text-sm hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm">
                                                    <span>Edit</span>
                                                </button>
                                                <button className="text-sm hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm">
                                                    <span>Manage</span>
                                                </button>
                                                <button className="text-sm hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm">
                                                    <span>Stats</span>
                                                </button>
                                            </div>
                                        </div>
                                        ) : <Skeleton width={150}/>
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
                                    </>: <Skeleton width={400}/>}
                                </div>
                                <div className='px-8'>
                                    {blog
                                    ? 
                                    <>
                                        <MdPreview editorId='preview-only' modelValue={blog?.content} previewTheme="github" language="en-US"/>
                                        <MdCatalog editorId='preview-only' scrollElement={document.body} />
                                    </>
                                    : 
                                    <Skeleton variant='rectangular' height="40vh"/>}
                                </div>
                                {/* Comment Section */}
                                <div className="bg-white mt-4 border-t p-6">
                                    <h2 className="text-xl font-semibold my-6">Top comments (2)</h2>
                                    <div className="mb-4 flex items-center">
                                        <Avatar className="w-8 h-8 rounded-full">
                                            <AvatarImage src={blog?.createdBy.image ?? ""}/>
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <input type="text" placeholder="Add to the discussion" className="w-full p-2 border rounded-md ml-2"/>
                                    </div>
                                    <div className="space-y-4">
                                        <div className='flex'>
                                            <Avatar className="w-8 h-8 rounded-full">
                                                <AvatarImage src={blog?.createdBy.image ?? ""} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div className='border p-2 rounded-md ml-2 w-full'>
                                                <p className="font-semibold">Chibueze Onyekpere <span className="text-gray-600 text-sm">Jul 21</span></p>
                                                <p className="text-gray-800">I really love this Google IDX concept. Great article</p>
                                                <p className="text-gray-600 text-sm">2 likes <span className="ml-2">Reply</span></p>
                                            </div>
                                        </div>
                                        <div className='border p-2 rounded-md'>
                                            <p className="font-semibold">Sh Raj <span className="text-gray-600 text-sm">Jul 22</span></p>
                                            <p className="text-gray-800">Thanks for the Appreciation Bro ✨</p>
                                            <p className="text-gray-600 text-sm">1 like <span className="ml-2">Reply</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar */}
                        <div className="hidden md:block w-96 p-2">
                            <div className="bg-white p-6 rounded-lg border mb-6">
                                <div className="flex items-center mb-2">
                                    <Avatar className="w-8 h-8 rounded-full">
                                        <AvatarImage src={blog?.createdBy.image ?? ""} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <p className="text-md font-semibold ml-2">{blog?.createdBy.name ?? <Skeleton width={64}/>}</p>
                                </div>
                                <p className="text-gray-600 text-sm">{blog?.createdBy.bio ?? <Skeleton />}</p>
                                <p className="text-gray-800 text-sm font-bold mt-2">Joined</p>
                                <p className="text-gray-600 text-sm">Jan 9, 2022</p>
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
