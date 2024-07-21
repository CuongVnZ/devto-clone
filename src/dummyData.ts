export const blogs = [
  {
    id: 1,
    title: "How to Create a Blog with Next.js and MDX",
    slug: "how-to-create-a-blog-with-next-js-and-mdx",
    content: "This is the content of the blog post.",
    tags: ["Next.js", "MDX"],
    userId: 1,
    comments: [
      {
        id: 1,
        content: "Great post!",
        userId: 2,
      },
    ],
    likes: [
      {
        userId: 2,
      },
      {
        userId: 3,
      }
    ],
    status: "published",
    createdAt: "2022-01-01",
  },
]

export const users = [
  {
    id: 1,
    name: "nora1903",
    email: "edgcuong@gmail.com"
  }
]