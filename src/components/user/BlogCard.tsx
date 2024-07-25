import { ModeCommentOutlined } from '@mui/icons-material';
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
                  <p className="text-sm font-semibold">{blog.createdBy.fullName}</p>
                  <p className="text-xs text-muted-foreground">Jul 16 (10 hours ago)</p>
              </div>
          </div>
          <div className="pl-10">
              <Link href={"/blog/" + blog.slug}>
                  <span className="text-xl font-bold hover:text-indigo-700">{blog.title}</span>
              </Link>
              <div className="flex flex-wrap gap-2 my-2">
                    {blog.tags.map(tag => (
                        <span key={tag} className="text-sm text-muted-foreground">#{tag}</span>
                    ))}
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <span className="text-sm">❤️‍🔥</span>
                      <span className="text-sm pr-5">5 Reactions</span>
                      <ModeCommentOutlined />
                      <span className="text-sm flex gap-1">1 <span className='hidden md:block'>Comment</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="text-sm">4 min read</span>
                  </div>
              </div>
          </div>
        </div>
    );
}
