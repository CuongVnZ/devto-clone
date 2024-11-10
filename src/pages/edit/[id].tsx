import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BlogEditor from "~/components/BlogEditor";
import Header from "~/components/Header";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function Component() {
  const session = useSession();
  const user = session.data?.user;

  const router = useRouter();
  const id = router.query.id as string;

  const [selectedFile, setSelectedFile] = useState<File>();
  const [pending, setPending] = useState(false);
  const [notification, setNotification] = useState(false);

  const { data: blog } = api.blog.getById.useQuery(id, {
    enabled: user !== undefined,
  });

  const mutation = api.blog.update.useMutation({
    onSuccess: async (data) => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", "cover");

        const upload = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const { imageUrl } = (await upload.json()) as { imageUrl: string };
      }
      setPending(false);
      setNotification(true);
      // await router.push("/blog/" + data.slug);
    },
  });

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="sm"
        onClick={() => router.push("/blog/" + blog?.slug)}
      >
        VIEW
      </Button>
    </React.Fragment>
  );

  const handleSubmit = async (data: {
    title: string;
    content: string;
    tags: string[];
    coverFile?: File;
  }) => {
    setPending(true);
    setSelectedFile(data.coverFile);
    const { coverFile, ...rest } = data;
    let coverExtension = blog?.coverExtension ?? "";
    if (coverFile) {
      coverExtension = coverFile.name.split(".").pop() ?? "";
    }
    mutation.mutate({ id, ...rest, coverExtension });
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-14">
        <div className="md:container mx-auto">
          <h1 className="text-3xl font-bold my-4">Update blog</h1>
          <BlogEditor
            initialTitle={blog?.title}
            initialContent={blog?.content}
            initialTags={blog?.tags}
            initialCover={
              blog?.coverExtension && blog.coverExtension.trim() !== ""
                ? "https://devto-clone.s3.amazonaws.com/cover/" +
                  blog?.id +
                  "." +
                  blog?.coverExtension
                : undefined
            }
            onSubmit={handleSubmit}
            submitButtonText="Update"
            pending={pending}
          />
        </div>
      </div>
      {/* <Snackbar
        open={notification}
        autoHideDuration={3000}
        message="Your blog has been saved!"
        action={action}
      /> */}
    </>
  );
}
