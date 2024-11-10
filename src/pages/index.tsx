/* eslint-disable react/no-unescaped-entities */
import Header from "~/components/Header";
import Contents from "~/components/home/Contents";
import LeftSidebar from "~/components/home/LeftSidebar";
import RightSidebar from "~/components/home/RightSidebar";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow pt-14">
        <div className="md:container flex">
          <LeftSidebar />
          <Contents />
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}
