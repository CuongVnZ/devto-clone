/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { api } from "~/utils/api";
// import ErrorPage from "next/error";
import {
  CalendarIcon,
  FileIcon,
  MessageCircleIcon,
  TagIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import BlogCard from "~/components/user/BlogCard";

export default function Component() {
  const session = useSession();
  const user = session.data?.user;

  const router = useRouter();
  const id = router.query.id as string;

  const [{ data: profile }, { data: blogs }] = api.useQueries((api) => [
    api.user.getById({ id }),
    api.blog.getByUser(id),
  ]);

  if (profile?.name == null) {
    // return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen pt-14">
        <div className="bg-black h-36"></div>
        {/* Profile section */}
        <div className="max-w-5xl mx-auto">
          <div className="relative -mt-16">
            <div className="bg-white p-8 rounded-lg border h-60">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Avatar className="w-32 h-32 rounded-full border-4 border-white">
                  <AvatarImage src={profile?.image ?? ""} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute top-4 right-4">
                {user?.name == profile?.name ? (
                  <Link href="/settings">
                    <Button className=" px-4 py-2">Edit Profile</Button>
                  </Link>
                ) : (
                  <Button className=" px-4 py-2">Follow</Button>
                )}
              </div>
              <div className="mt-16 items-center text-center">
                {profile ? (
                  <>
                    <h1 className="text-3xl font-bold">{profile?.fullName}</h1>
                    <p className="text-gray-700 mt-2">{"404 bio not found"}</p>
                    <div className="flex items-center justify-center text-gray-500 mt-8">
                      <CalendarIcon />
                      <span className="text-sm">Joined on Jul 16, 2024</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="hidden md:block w-[50%]">
              <div className="bg-white p-4 rounded-lg border">
                <ul className="space-y-2 text-md text-muted-foreground">
                  <li className="flex items-center">
                    <FileIcon />
                    <span className="ml-2 text-gray-700">
                      {profile?._count.blogs ?? 0} post published
                    </span>
                  </li>
                  <li className="flex items-center">
                    <MessageCircleIcon />
                    <span className="ml-2 text-gray-700">
                      {profile?._count.comments ?? 0} comments written
                    </span>
                  </li>
                  <li className="flex items-center">
                    <TagIcon />
                    <span className="ml-2 text-gray-700">11 tags followed</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full">
              {blogs ? (
                blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
              ) : (
                <Skeleton className="w-full h-60" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
