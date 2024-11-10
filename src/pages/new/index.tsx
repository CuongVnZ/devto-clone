import { useSession } from "next-auth/react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import BlogEditor from "~/components/BlogEditor";
import Header from "~/components/Header";
import { api } from "~/utils/api";

export default function Component() {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File>();
  const [pending, setPending] = useState(false);

  const mutation = api.blog.create.useMutation({
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
      await router.push("/blog/" + data.slug);
    },
  });

  if (!user) {
    return <ErrorPage statusCode={404} />;
  }

  const handleSubmit = async (data: {
    title: string;
    content: string;
    tags: string[];
    coverFile?: File;
  }) => {
    setPending(true);
    setSelectedFile(data.coverFile);
    const { coverFile, ...rest } = data;
    const coverExtension = coverFile
      ? (coverFile.name.split(".").pop() ?? "")
      : "";
    mutation.mutate({ ...rest, coverExtension });
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-14">
        <div className="md:container mx-auto">
          <h1 className="text-3xl font-bold my-4">Create a new blog</h1>
          <BlogEditor
            initialTags={[]}
            initialContent="**Hello world!!!**"
            onSubmit={handleSubmit}
            submitButtonText="Create"
            pending={pending}
          />
        </div>
      </div>
    </>
  );
}
