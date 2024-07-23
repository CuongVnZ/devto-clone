/* eslint-disable react/no-unescaped-entities */
import { useSession } from 'next-auth/react';
import Header from '~/components/Header';
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { useState } from 'react';
import { useRouter } from 'next/router';

import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default function Component() {
    const session = useSession();
    const user = session.data?.user;

    const router = useRouter()
    const mutation = api.blog.create.useMutation({ onSuccess: (data) => router.push("/blog/"+data.slug) })


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("**Hello world!!!**");
    const [tags, setTags] = useState("");

    if(!user) {
        // return <ErrorPage statusCode={404} />;
    }

    const handleCreateBlog = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate({ title, content });
    }

    return (
        <>
            <Header />
            <div className="container bg-gray-100 min-h-screen pt-14">
                {/* Create new blog page */}
                <div className=" mx-auto p-4">
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
                            <div>
                                <MdEditor modelValue={content} onChange={setContent} language='en-US'/>
                            </div>
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
