import {
  AwardIcon,
  CodeIcon,
  ContactIcon,
  HeartIcon,
  HomeIcon,
  InfoIcon,
  LightbulbIcon,
  ListIcon,
  PhoneIcon,
  PodcastIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  TagIcon,
  TerminalIcon,
  TrophyIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
export default function Component() {
  return (
    <aside className="w-64 py-4 mx-2 hidden md:block">
      <nav className="flex flex-col space-y-4 text-gray-700">
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <HomeIcon className="w-6 h-6" />
          Home
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <ListIcon className="w-6 h-6" />
          Reading List
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <PodcastIcon className="w-6 h-6" />
          Podcasts
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <VideoIcon className="w-6 h-6" />
          Videos
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <TagIcon className="w-6 h-6" />
          Tags
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <LightbulbIcon className="w-6 h-6" />
          DEV Help
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <ShoppingBagIcon className="w-6 h-6" />
          Forem Shop
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <HeartIcon className="w-6 h-6" />
          Advertise on DEV
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <TrophyIcon className="w-6 h-6" />
          DEV Challenges
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <AwardIcon className="w-6 h-6" />
          DEV Showcase
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <InfoIcon className="w-6 h-6" />
          About
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <PhoneIcon className="w-6 h-6" />
          Contact
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <ContactIcon className="w-6 h-6" />
          Guides
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:underline"
          prefetch={false}
        >
          <TerminalIcon className="w-6 h-6" />
          Software comparisons
        </Link>
        <div className="border-t pt-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <CodeIcon className="w-6 h-8" />
            Code of Conduct
          </Link>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <ShieldCheckIcon className="w-6 h-8" />
            Privacy Policy
          </Link>
        </div>
      </nav>
    </aside>
  );
}
