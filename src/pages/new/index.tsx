/* eslint-disable react/no-unescaped-entities */
import { useSession } from 'next-auth/react';
import Header from '~/components/Header';
import { Button } from "~/components/ui/button";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { redirect } from 'next/navigation'
import { useState } from 'react';

export default function Component() {
    const session = useSession();
    const user = session.data?.user;

    const mutation = api.blog.create.useMutation({ onSuccess: (data) => redirect("/blog/"+data.slug) })


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    if(!user) {
        return <ErrorPage statusCode={404} />;
    }

    const handleCreateBlog = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate({ title, content });
    }

    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen pt-14">
                {/* Create new blog page */}
                <div className="max-w-4xl mx-auto p-4">
                    <div className="bg-white p-8 rounded-lg border">
                        <h1 className="text-3xl font-bold">Create a new blog</h1>
                        <form className="space-y-4 mt-6" onSubmit={handleCreateBlog}>
                            <input 
                                className="w-full p-2 border border-gray-300 rounded-lg" 
                                type="text" 
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea 
                                className="w-full p-2 border border-gray-300 rounded-lg" 
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            >
                            </textarea>
                            <input 
                                className="w-full p-2 border border-gray-300 rounded-lg" 
                                type="text" 
                                placeholder="Tags" 
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <Button className="w-full p-2" disabled={mutation.isPending}>Create</Button>
                        </form>
                    </div>
                </div>
            </div>
        </> 
    );
}
