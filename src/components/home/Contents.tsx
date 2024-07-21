/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { BookmarkBorderOutlined, ModeCommentOutlined } from '@mui/icons-material';
import Link from "next/link";
import { api } from "~/utils/api";
import BlogComponent from "~/components/home/BlogComponent";

export default function Component() {

  const { data: blogs } = api.blog.getAll.useQuery();
  // if (blogs == null) {
  //   return null;
  // }

  return (
    <div className="flex-grow p-4 max-w-3xl">
    <Card className="col-span-1 bg-white border rounded-lg overflow-hidden mb-6">
      <img 
        src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fnuy8zc5v6fsfl2ehi4g8.gif" 
        alt="Cover Image"
        className="w-full min-h-60 object-cover" 
      />
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage src="https://i.pravatar.cc/50" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Sunil Kumar Dash</p>
            <p className="text-xs text-muted-foreground">Jul 16 (10 hours ago)</p>
          </div>
        </div>
        <div className="pl-10">
          <Link href={"/blog/1"}>
            <span className="text-xl font-bold mb-2">How to build a Perplexity-like Chatbot in Slack?</span>
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
              <span className="text-sm">1 Comment</span>
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

    {
      blogs?.map(blog => (
        <BlogComponent key={blog.id} blog={blog} />
      ))
    }

    </div>
  );
}

function Comment({ avatarSrc, author, time, text }: { avatarSrc: string, author: string, time: string, text: string }) {
  return (
    <div className="flex gap-4 p-4 bg-gray-100 rounded-lg">
      <Avatar className="w-8 h-8 rounded-full">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{author}</p>
        <p className="text-xs text-muted-foreground mb-2">{time}</p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}