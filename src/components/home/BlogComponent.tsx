import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  BookmarkBorderOutlined,
  ModeCommentOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { Skeleton } from "~/components/ui/skeleton"; // Add this import
import Image from "next/image";

type Blog = Prisma.BlogGetPayload<{
  select: {
    id: true;
    coverExtension: true;
    title: true;
    slug: true;
    tags: true;
    createdBy: {
      select: { id: true; name: true; fullName: true; image: true };
    };
    createdAt: true;
    _count: {
      select: {
        likes: true;
        comments: true;
      };
    };
    comments: {
      include: {
        createdBy: true;
      };
    };
  };
}>;

type Comment = Prisma.CommentGetPayload<{
  include: {
    createdBy: true;
  };
}>;

export default function Component({ blog }: { blog?: Blog }) {
  if (!blog) {
    return (
      <>
        <BlogSkeleton />
        <BlogSkeleton />
      </>
    );
  }

  if (!blog) return null;

  return (
    <Card className="col-span-1 bg-white border rounded-lg overflow-hidden mb-6">
      {blog.coverExtension && (
        <Link href={"/blog/" + blog.slug}>
          <Image
            src={`https://devto-clone.s3.amazonaws.com/cover/${blog.id}.${blog.coverExtension}`}
            alt="Cover Image"
            width={1200}
            height={630}
            className="w-full max-h-60 object-cover"
          />
        </Link>
      )}
      <CardContent className="p-4">
        <div className="items-center mb-4">
          <Link className="flex gap-2" href={"/user/" + blog.createdBy.id}>
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage src={blog.createdBy?.image ?? ""} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold hover:text-indigo-700">
                {blog.createdBy.fullName}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </div>
        <div className="pl-10">
          <Link href={"/blog/" + blog.slug}>
            <span className="text-2xl font-bold hover:text-indigo-700">
              {blog.title}
            </span>
          </Link>
          <div className="flex flex-wrap gap-4 mt-2 mb-4 text-gray-700">
            {blog.tags.map((tag, index) => (
              <span key={index} className="text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <div className="flex items-center gap-2 text-sm">
              <span className="">❤️‍🔥</span>
              <span className="flex gap-1 pr-5">
                22 <span className="hidden md:block">Reactions</span>
              </span>
              <ModeCommentOutlined />
              <span className="flex gap-1">
                {blog._count.comments}{" "}
                {blog._count.comments > 0 ? (
                  <span className="hidden md:block">Comments</span>
                ) : (
                  <span className="hidden md:block">Comment</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="">4 min read</span>
              <BookmarkBorderOutlined className="" />
            </div>
          </div>
        </div>

        <div className="flex mt-4">
          {blog.comments[0] && <Comment comment={blog.comments[0]} />}
        </div>
      </CardContent>
    </Card>
  );
}

function BlogSkeleton() {
  return (
    <Card className="col-span-1 bg-white border rounded-lg overflow-hidden mb-6">
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="ml-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
        </div>
        <div className="pl-10">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg w-full">
      <Avatar className="w-8 h-8 rounded-full">
        <AvatarImage src={comment.createdBy.image ?? ""} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-semibold">{comment.createdBy.fullName}</p>
          <p className="text-xs text-muted-foreground">
            {comment.createdAt.toLocaleDateString()}
          </p>
        </div>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  );
}
