/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router'
import { api } from "~/utils/api";
import Header from '~/components/Header';
// import ErrorPage from "next/error";
import { CakeOutlined, ModeCommentOutlined, StickyNote2Outlined, TagOutlined } from '@mui/icons-material';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BlogCard from '~/components/user/BlogCard';
import { Button } from '~/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export default function Component() {
    const session = useSession();
    const user = session.data?.user;

    const router = useRouter()
    const id = router.query.id as string;

    const [ {data: profile} , {data: blogs} ] = api.useQueries((api) => [
        api.user.getById({id}, {enabled: user !== undefined}),
        api.blog.getByUser(id, {enabled: user !== undefined})
    ])

    if (profile?.name == null) {
        // return <ErrorPage statusCode={404} />;
    }
    
    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen pt-14">
                <div className="bg-black h-36"></div>
                <div className="max-w-4xl mx-auto container">
                    <div className="relative -mt-16">
                        <div className="bg-white p-8 rounded-lg border">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                {/* <img src={user?.image} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white" /> */}
                                <Avatar className="w-32 h-32 rounded-full border-4 border-white">
                                    <AvatarImage src={user?.image ?? ""} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="absolute top-4 right-4">
                                {user?.name == profile?.name 
                                ? <Link href="/settings"><Button className=" px-4 py-2">Edit Profile</Button></Link>
                                : <Button className=" px-4 py-2">Follow</Button>
                                }

                            </div>
                            <div className="mt-12 text-center">
                                <h1 className="text-3xl font-bold">{profile?.name ?? <Skeleton />}</h1>
                                <p className="text-gray-600">404 bio not found</p>
                                <div className="flex items-center justify-center text-gray-600 mt-2">
                                    <CakeOutlined />
                                    <span>Joined on Jul 16, 2024</span>
                                    <i className="fab fa-github ml-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="hidden md:block w-1/3">
                            <div className="bg-white p-4 rounded-lg border">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center">
                                        <StickyNote2Outlined />
                                        <span className="ml-2">{profile?.blogsCount ?? <Skeleton />} post published</span>
                                    </li>
                                    <li className="flex items-center">
                                        <ModeCommentOutlined />
                                        <span className="ml-2">{profile?.commentsCount ?? <Skeleton />} comments written</span>
                                    </li>
                                    <li className="flex items-center">
                                        <TagOutlined />
                                        <span className="ml-2">11 tags followed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-2/3">
                            {
                                blogs?.map(blog => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
