/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

export default function Component() {
  return (
    <aside className="w-96 py-4 mx-2 hidden md:block">
      <Card className="col-span-1 bg-muted/10 border-muted/20 rounded-lg bg-white">
        <CardHeader className="border-b py-2 px-4">
          <CardTitle className="text-xl font-bold">Active discussions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 p-4 text-gray-700">
          <div className="flex flex-col border-b pb-2">
            <Link href="#" className="text-sm mb-2" prefetch={false}>
              Meme Monday
            </Link>
            <span className="text-xs text-slate-500">79 comments</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <Link href="#" className="text-sm mb-2" prefetch={false}>
              JavaScript Event Loop: A Deep Dive
            </Link>
            <span className="text-xs text-slate-500">7 comments</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <Link href="#" className="text-sm mb-2" prefetch={false}>
              Welcome Thread - v285
            </Link>
            <span className="text-xs text-slate-500">3 comments</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <Link href="#" className="text-sm mb-2" prefetch={false}>
              Running a Website Speed Test
            </Link>
            <span className="text-xs text-slate-500">4 comments</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <Link href="#" className="text-sm mb-2" prefetch={false}>
              Music Monday — What are you listening to? (Summertime Edition 🎧)
            </Link>
            <span className="text-xs text-slate-500">22 comments</span>
          </div>
          <div className="flex flex-col border-b pb-2">
            <Link href="#" className="text-sm mb-2" prefetch={false}>
              5 VS CODE EXTENSIONS I USE DAILY !
            </Link>
            <span className="text-xs text-slate-500">5 comments</span>
          </div>
          <div className="flex flex-col">
            <Link href="#" className="text-sm mb-2" prefetch={false}>
              Infamous Guitars: Wix Studio 'Make an Offer' eCommerce Website using Wix Velo
            </Link>
            <span className="text-xs text-slate-500">3 comments</span>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
