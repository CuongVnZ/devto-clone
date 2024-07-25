import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { FavoriteBorderOutlined, ModeCommentOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { User } from '@prisma/client';

interface CommentProps {
  author: User;
  date: string;
  content: string;
  likes: number;
}

const Comment: React.FC<CommentProps> = ({ author, date, content, likes }) => {
  return (
    <div className='flex'>
      <Avatar className="w-8 h-8 rounded-full">
        <AvatarImage src={author.image ?? ""} />
        <AvatarFallback>{author.name}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col ml-2 w-full gap-2'>
        <div className='border p-2 rounded-md w-full'>
          <Link href={"/user/" + author.id}>
            <p className="font-semibold mb-4">{author.name} <span className="text-gray-600 text-sm">• {date}</span></p>
          </Link>
          <p className="text-gray-800 mb-4">{content}</p>
        </div>
        <div className='flex text-xs items-center gap-4 text-gray-700'>
          <div className=''>
            <FavoriteBorderOutlined className='size-5'/>
            <span className="ml-1">{likes} likes</span>
          </div>
          <div className=''>
            <ModeCommentOutlined className='size-5'/>
            <span className="ml-1">Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;