/* eslint-disable react/no-unescaped-entities */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/utils/api";

import { BookmarkIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import { MdCatalog, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Comment from "~/components/blog/Comment";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

interface CommentType {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
    image: string;
  };
  likes: number;
}

export default function Component() {
  const session = useSession();
  const user = session.data?.user;

  const router = useRouter();
  const id = router.query.id as string;

  const commentMutation = api.comment.create.useMutation();
  const {
    data: blog,
    isSuccess,
    refetch: refetchBlog,
  } = api.blog.getBySlug.useQuery(id);

  const [date, setDate] = useState("July 16");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (blog && isSuccess) {
      const tmp = new Date(blog.createdAt);
      setDate(tmp.toDateString());
    }
  }, [blog, isSuccess]);

  const handleComment = async () => {
    if (blog && comment.length > 0) {
      await commentMutation.mutateAsync({ content: comment, blogId: blog.id });
      setComment("");
      await refetchBlog();
    }
  };

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
                  <HeartIcon className="text-gray-700 hover:text-red-500" />
                  <span className="mt-2 text-sm text-muted-foreground">
                    {blog?._count.comments ?? <Skeleton />}
                  </span>
                </button>
                <button className="p-2 flex flex-col items-center">
                  <MessageCircleIcon className="text-gray-700 hover:text-yellow-500" />
                  <span className="mt-2 text-sm text-muted-foreground">
                    {blog?._count.comments ?? <Skeleton />}
                  </span>
                </button>
                <button className="p-2 flex flex-col items-center">
                  <BookmarkIcon className="text-gray-700 hover:text-blue-500" />
                  <span className="mt-2 text-sm text-muted-foreground">
                    {blog?._count.comments ?? <Skeleton />}
                  </span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow w-9/12 md:ml-16">
              <div className="bg-white rounded-lg border mt-2">
                {blog?.coverExtension && (
                  <Image
                    src={
                      "https://devto-clone.s3.amazonaws.com/cover/" +
                      blog.id +
                      "." +
                      blog.coverExtension
                    }
                    alt="Cover Image"
                    width={1200}
                    height={630}
                    className="w-full h-72 object-cover rounded-t-lg"
                  />
                )}
                <div className="px-12 pt-8">
                  <div className="flex items-center mb-4 justify-between">
                    <div className="flex">
                      <Avatar className="w-10 h-10 rounded-full">
                        <AvatarImage src={blog?.createdBy.image ?? ""} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <Link href={"/user/" + blog?.createdBy.id} passHref>
                          <h2 className="text-md font-semibold hover:text-indigo-700">
                            {blog?.createdBy.fullName ?? (
                              <Skeleton className="w-24" />
                            )}
                          </h2>
                          <p className="text-gray-600 text-sm">
                            {blog?.createdBy.name ? (
                              date
                            ) : (
                              <Skeleton className="w-24" />
                            )}
                          </p>
                        </Link>
                      </div>
                    </div>
                    {user?.id === blog?.createdBy.id && (
                      <>
                        <div className="flex">
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
                    )}
                  </div>
                  <div className="flex space-x-2 mb-4">
                    {blog ? (
                      <>
                        <span className="flex items-center space-x-1">
                          <span role="img" aria-label="heart">
                            ❤️
                          </span>{" "}
                          <span>28</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span role="img" aria-label="unicorn">
                            🦄
                          </span>{" "}
                          <span>2</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span role="img" aria-label="astonished">
                            😲
                          </span>{" "}
                          <span>2</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span role="img" aria-label="high-five">
                            🙌
                          </span>{" "}
                          <span>4</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span role="img" aria-label="fire">
                            🔥
                          </span>{" "}
                          <span>2</span>
                        </span>
                      </>
                    ) : (
                      <Skeleton className="w-40" />
                    )}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {blog?.title ?? <Skeleton />}
                  </h1>
                  {/* Hashtag line */}
                  {blog ? (
                    blog.tags.map((tag) => (
                      <button
                        key={tag}
                        className="p-1 text-gray-600 text-sm rounded-lg hover:bg-gray-200"
                      >
                        #{tag}
                      </button>
                    ))
                  ) : (
                    <Skeleton />
                  )}
                </div>
                <div className="px-8">
                  {blog ? (
                    <>
                      <MdPreview
                        editorId="preview-only"
                        modelValue={blog?.content}
                        previewTheme="github"
                        language="en-US"
                      />
                      <MdCatalog
                        editorId="preview-only"
                        scrollElement={document.body}
                      />
                    </>
                  ) : (
                    <Skeleton className="mx-4 mb-8 h-96" />
                  )}
                </div>
                {/* Comment Section */}
                <div className="bg-white mt-2 border-t px-12 mb-4">
                  <h2 className="text-xl font-semibold mt-12 mb-8">
                    Top comments (2)
                  </h2>
                  <div className="mb-4 flex">
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src={user?.image ?? ""} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full ml-2">
                      <textarea
                        placeholder="Add to the discussion"
                        className=" p-2 border rounded-md "
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        className="bg-indigo-600 text-white w-24 mt-2"
                        onClick={handleComment}
                        disabled={commentMutation.isPending}
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-8">
                    {blog?.comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        author={comment.createdBy}
                        date={new Date(comment.createdAt).toLocaleDateString()}
                        content={comment.content}
                        likes={0}
                      />
                    ))}
                    <div className="flex">
                      <Avatar className="w-8 h-8 rounded-full">
                        <AvatarImage src={blog?.createdBy.image ?? ""} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col ml-2 w-full gap-2">
                        <div className="border p-2 rounded-md w-full">
                          <p className="font-semibold mb-4">
                            Nora{" "}
                            <span className="text-gray-600 text-sm">
                              • Jul 21
                            </span>
                          </p>
                          <p className="text-gray-800 mb-4">
                            Thanks for the Appreciation Bro ✨
                          </p>
                        </div>
                        <div className="flex text-xs items-center gap-4 text-gray-700">
                          <div className="">
                            <HeartIcon className="size-5" />
                            <span className="ml-1">2 likes</span>
                          </div>
                          <div className="">
                            <MessageCircleIcon className="size-5" />
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
                      <AvatarImage src={blog?.createdBy.image ?? ""} />
                      <AvatarFallback>{blog?.createdBy.name}</AvatarFallback>
                    </Avatar>
                    <Link href={"/user/" + blog?.createdBy.id} passHref>
                      <h2 className="text-xl font-bold -mt-2 ml-2 hover:text-indigo-700">
                        {blog?.createdBy.fullName}
                      </h2>
                    </Link>
                  </div>
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700 w-full">
                    Follow
                  </Button>
                  <p className="text-sm text-gray-600 my-4">
                    {blog?.createdBy.bio ?? "404 bio not found"}
                  </p>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <h3 className="font-semibold text-gray-700">WEBSITE</h3>
                      <p className="text-gray-600">loading</p>
                    </div>
                    <div className="text-sm">
                      <h3 className="font-semibold text-gray-700">LOCATION</h3>
                      <p className="text-gray-600">loading</p>
                    </div>
                    <div className="text-sm">
                      <h3 className="font-semibold text-gray-700">JOINED</h3>
                      <p className="text-gray-600">
                        {blog?.createdBy.createdAt
                          ? blog.createdBy.createdAt.toDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4 border-b">
                  More from{" "}
                  <span className="text-indigo-700">
                    {blog?.createdBy.fullName ?? <Skeleton />}
                  </span>
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-700 hover:underline">
                      Are Next.js Server Actions Secure?
                    </a>
                    <p className="text-gray-400 text-sm">
                      #javascript #webdev #nextjs #serveractions
                    </p>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:underline">
                      How to Create a Telegram Bot Using PHP
                    </a>
                    <p className="text-gray-400 text-sm">
                      #php #telegram #webdev #javascript
                    </p>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:underline">
                      Single Page Applications (SPAs)
                    </a>
                    <p className="text-gray-400 text-sm">
                      #spa #react #javascript #angular
                    </p>
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
