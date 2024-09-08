/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { api } from "~/utils/api";
import BlogComponent from "~/components/home/BlogComponent";

export default function Component() {
  const { data: blogs } = api.blog.getAll.useQuery();

  return (
    <div className="flex-grow py-4 mx-2 w-8/12">
      {blogs ? (
        blogs.map((blog) => <BlogComponent key={blog.id} blog={blog} />)
      ) : (
        <BlogComponent />
      )}
    </div>
  );
}
