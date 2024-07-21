/* eslint-disable react/no-unescaped-entities */
import { BookmarkBorderOutlined, ModeCommentOutlined } from '@mui/icons-material';
import { type Prisma } from '@prisma/client'
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

type Blog = Prisma.BlogGetPayload<{
  include: { createdBy: true }
}>

export default function Component({blog}: {blog: Blog}) {

    return (
        <div className="bg-white p-6 rounded-lg border mb-4">
          <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-8 h-8 rounded-full">
                  <AvatarImage src={blog.createdBy.image ?? ""} />
                  <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                  <p className="text-sm font-semibold">{blog.createdBy.name}</p>
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
                      <span className="text-sm">1 Comment</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="text-sm">4 min read</span>
                      <BookmarkBorderOutlined />
                  </div>
              </div>
          </div>
        </div>
    );
}
