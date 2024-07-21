/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { BookmarkBorderOutlined, ModeCommentOutlined } from '@mui/icons-material';
import Link from "next/link";
import { Prisma } from "@prisma/client";

type Blog = Prisma.BlogGetPayload<{
  include: { createdBy: true },
  commentCount: number
}>

export default function Component({ blog } : { blog: Blog }) {
    return (
        <>
    <Card className="col-span-1 bg-white border rounded-lg overflow-hidden mb-6">
      {/* <img 
        src={blog.cover} 
        alt="Cover Image"
        className="w-full min-h-60 object-cover" 
      /> */}
      {
        blog.cover ? (
          <img 
            src={blog.cover} 
            alt="Cover Image"
            className="w-full min-h-60 object-cover" 
          />
        ) : null
      }
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage src={blog.createdBy.image} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{blog.createdBy.fullName}</p>
            <p className="text-xs text-muted-foreground">Jul 16 (10 hours ago)</p>
          </div>
        </div>
        <div className="pl-10">
          <Link href={"/blog/" + blog.slug}>
            <span className="text-xl font-bold mb-2">{blog.title}</span>
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-muted-foreground">#webdev</span>
            <span className="text-sm text-muted-foreground">#python</span>
            <span className="text-sm text-muted-foreground">#programming</span>
            <span className="text-sm text-muted-foreground">#ai</span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-sm">❤️‍🔥🤖🎶🤹</span>
              <span className="text-sm pr-5">22 Reactions</span>
              <ModeCommentOutlined />
              <span className="text-sm">{blog._count.comments} {blog._count.comments > 0 ? "Comments" : "Comment"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">4 min read</span>
              <BookmarkBorderOutlined className="" />
            </div>
          </div>
        </div>
          
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage src="https://i.pravatar.cc/50?u=commenter" />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Florian Rappl</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <p className="text-sm">
            While the micro scheme is fine, it lacks a proper repository structuring. As an example, not aggregating the source code in a <code>src</code> directory is a huge misstep. You might want to use TypeScript or some other tooling (e.g., a bundler) to process your code for performance benefits.
          </p>
        </div>
      </CardContent>
    </Card>
        </>
    );
}
