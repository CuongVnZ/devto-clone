import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { type JSX, type SVGProps } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';

export default function Component() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="fixed w-full bg-white border-b">
      <div className="md:container">
        <div className="px-4 flex items-center justify-between h-14 z-50">
          <div className="flex items-center gap-4 w-full">
            <Link href={"/"} passHref>
              <div className="flex items-center gap-2">
                <DiscIcon className="w-8 h-8" />
                <span className="sr-only">DEV</span>
              </div>
            </Link>
            <div className="relative w-1/2 hidden md:block">
              <Input type="search" placeholder="Search..." className="pl-10 w-full" />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            {/* <span className="text-sm text-muted-foreground ml-4">Powered by Algolia</span> */}
          </div>
          {user && (
          <div className="flex items-center gap-4">
            <Link href={"/new"} passHref>
              <Button className="hidden md:block">Create Post</Button>
            </Link>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <NotificationsNoneIcon />
              </Button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4">
                  <p className="text-sm text-gray-700">No new notifications</p>
                </div>
              )}
            </div>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsAvatarOpen(!isAvatarOpen)}
              >
                <Avatar className="w-8 h-8 rounded-full">
                  <AvatarImage src={user.image ?? ''} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
              {isAvatarOpen && (
                <div className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg">
                  <Link href={"/user/" + user.id} passHref>
                    <div className="p-4 hover:underline">
                      <p className="font-semibold">Chi Cuong Nguyen</p>
                      <p className="text-sm text-gray-500">@{user?.name}</p>
                    </div>
                  </Link>
                  <div className="border-t">
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href={"/new"} passHref  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Create Post
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Reading List
                    </Link>
                    <Link href={"/settings"} passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => void signOut()}>
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
          {!user && (
            <Button onClick={() => void signIn()} className="hidden md:block">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

function DiscIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
