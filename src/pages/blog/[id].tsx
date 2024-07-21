/* eslint-disable react/no-unescaped-entities */
import { BookmarkBorderOutlined, FavoriteBorderOutlined, ModeCommentOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '~/components/Header';
import { api } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Component() {
    const router = useRouter()
    const id = router.query.id as string;

    const { data: blog } = api.blog.getById.useQuery(id);

    if (blog == null) {
        // return <ErrorPage statusCode={404} />;
    }

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
                <main className="md:container pt-16">
                    <div className="flex">
                        {/* Left Sidebar */}
                        <div className="hidden md:block w-16 p-2">
                            <div className="flex flex-col items-center space-y-4">
                                <button className="bg-gray-200 p-3 rounded-full">
                                    <FavoriteBorderOutlined />
                                </button>
                                <button className="bg-gray-200 p-3 rounded-full">
                                    <ModeCommentOutlined />
                                </button>
                                <button className="bg-gray-200 p-3 rounded-full">
                                    <BookmarkBorderOutlined />
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-grow p-2 w-9/12">
                            <div className="bg-white p-6 rounded-lg border">
                                <div className="flex items-center mb-4">
                                    <Avatar className="w-10 h-10 rounded-full">
                                        <AvatarImage src={blog?.createdBy.image ?? ""} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-2">
                                        <h2 className="text-md font-semibold">{blog?.createdBy.name ?? <Skeleton />}</h2>
                                        <p className="text-gray-600 text-sm">
                                            Posted on Jul 16 • Updated on Jul 18
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 mb-4">
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
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog?.title ?? <Skeleton />}</h1>
                                {/* Hashtag line */}
                                <div className="flex space-x-2 mb-4">
                                    <button className="p-1 text-gray-600 text-sm rounded-lg hover:bg-yellow-200">#javascript</button>
                                    <button className="text-gray-600 text-sm">#webdev</button>
                                    <button className="text-gray-600 text-sm">#programming</button>
                                </div>
                                <p className="text-gray-800 mb-4 break-words">
                                    {blog?.content ?? <Skeleton count={10}/>}
                                </p>
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
                                    <p className="text-md font-semibold ml-2">{blog?.createdBy.name ?? <Skeleton />}</p>
                                </div>
                                <p className="text-gray-600 text-sm">{blog?.createdBy.bio ?? <Skeleton />}</p>
                                <p className="text-gray-600 text-sm">Joined Jan 9, 2022</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border">
                                <h2 className="text-xl font-semibold mb-4 border-b">More from {blog?.createdBy.name ?? <Skeleton />}</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-blue-500 hover:underline">
                                            Are Next.js Server Actions Secure?
                                        </a>
                                        <p className="text-gray-600 text-sm">#javascript #webdev #nextjs #serveractions</p>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-500 hover:underline">
                                            How to Create a Telegram Bot Using PHP
                                        </a>
                                        <p className="text-gray-600 text-sm">#php #telegram #webdev #javascript</p>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-500 hover:underline">
                                            Single Page Applications (SPAs)
                                        </a>
                                        <p className="text-gray-600 text-sm">#spa #react #javascript #angular</p>
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
