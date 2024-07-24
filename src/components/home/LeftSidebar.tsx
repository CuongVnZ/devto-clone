import Link from "next/link"
import { 
  HomeOutlined, 
  FormatListBulletedOutlined, 
  PodcastsOutlined, 
  VideocamOutlined,
  LightbulbOutlined,
  SellOutlined,
  PolicyOutlined,
  CodeOutlined,
  AutoAwesomeOutlined,
  CallEndOutlined,
  EmojiEventsOutlined,
  FavoriteBorderOutlined,
  ImportContactsOutlined,
  InfoOutlined,
  ShoppingBagOutlined,
  TerminalOutlined
} from '@mui/icons-material';

export default function Component() {
  return (
  <aside className="w-64 py-4 mx-2 hidden md:block">
  <nav className="flex flex-col space-y-4 text-gray-700">
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <HomeOutlined className="w-6 h-6" />
      Home
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <FormatListBulletedOutlined className="w-6 h-6" />
      Reading List
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <PodcastsOutlined className="w-6 h-6" />
      Podcasts
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <VideocamOutlined className="w-6 h-6" />
      Videos
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <SellOutlined className="w-6 h-6" />
      Tags
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <LightbulbOutlined className="w-6 h-6" />
      DEV Help
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <ShoppingBagOutlined className="w-6 h-6" />
      Forem Shop
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <FavoriteBorderOutlined className="w-6 h-6" />
      Advertise on DEV
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <EmojiEventsOutlined className="w-6 h-6" />
      DEV Challenges
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <AutoAwesomeOutlined className="w-6 h-6" />
      DEV Showcase
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <InfoOutlined className="w-6 h-6" />
      About
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <CallEndOutlined className="w-6 h-6" />
      Contact
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <ImportContactsOutlined className="w-6 h-6" />
      Guides
    </Link>
    <Link href="#" className="flex items-center gap-2 hover:underline" prefetch={false}>
      <TerminalOutlined className="w-6 h-6" />
      Software comparisons
    </Link>
    <div className="border-t pt-4">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <CodeOutlined className="w-6 h-8" />
        Code of Conduct
      </Link>
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <PolicyOutlined className="w-6 h-8" />
        Privacy Policy
      </Link>
    </div>
  </nav>
  </aside>
  );
}