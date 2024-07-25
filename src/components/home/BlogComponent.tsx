import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { BookmarkBorderOutlined, ModeCommentOutlined } from '@mui/icons-material';
import Link from "next/link";
import type { Prisma } from "@prisma/client";

type Blog = Prisma.BlogGetPayload<{
  select: {
    id: true,
    coverExtension: true,
    title: true,
    slug: true,
    tags: true,
    createdBy: { select: { id: true, name: true, fullName: true, image: true } },
    createdAt: true,
    _count: { 
      select: { 
        likes: true,
        comments: true,
      } 
    },
  }
}>

export default function Component({ blog } : { blog: Blog }) {
    return (
        <>
    <Card className="col-span-1 bg-white border rounded-lg overflow-hidden mb-6">
      {
        blog.coverExtension && (
          <img 
            src={"https://devto-clone.s3.amazonaws.com/cover/" + blog.id + "." + blog.coverExtension} 
            alt="Cover Image"
            className="w-full max-h-60 object-cover" 
          />
        )
      }
      <CardContent className="p-4">
        <div className="items-center mb-4">
        <Link className="flex gap-2" href={"/user/" + blog.createdBy.id}>
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage src={blog.createdBy?.image ?? ""} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{blog.createdBy.fullName}</p>
            <p className="text-xs text-muted-foreground">Jul 16 (10 hours ago)</p>
          </div>
        </Link>
        </div>
        <div className="pl-10">
          <Link href={"/blog/" + blog.slug}>
            <span className="text-2xl font-bold hover:text-indigo-700">{blog.title}</span>
          </Link>
          <div className="flex flex-wrap gap-4 mt-2 mb-4 text-gray-700">
            <span className="text-sm">#webdev</span>
            <span className="text-sm">#python</span>
            <span className="text-sm">#programming</span>
            <span className="text-sm">#ai</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <div className="flex items-center gap-2 text-sm">
              <span className="">❤️‍🔥</span>
              <span className="flex gap-1 pr-5">22 <span className="hidden md:block">Reactions</span></span>
              <ModeCommentOutlined />
              <span className="flex gap-1">{blog._count.comments} {blog._count.comments > 0 ? <span className="hidden md:block">Comments</span> : <span className="hidden md:block">Comment</span>}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="">4 min read</span>
              <BookmarkBorderOutlined className="" />
            </div>
          </div>
        </div>
          
        <div className="flex mt-4">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage src="https://i.pravatar.cc/50?u=commenter" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="ml-2 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex justify-center items-center">
                <p className="text-sm font-semibold">Florian Rappl</p>
                <p className="text-sm text-muted-foreground ml-2">2 hours ago</p>
              </div>
            </div>
            <p className="text-sm">
              While the micro scheme is fine, it lacks a proper repository structuring. As an example, not aggregating the source code in a <code>src</code> directory is a huge misstep. You might want to use TypeScript or some other tooling (e.g., a bundler) to process your code for performance benefits.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
        </>
    );
}
