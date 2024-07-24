/* eslint-disable react/no-unescaped-entities */
import { useSession } from 'next-auth/react';
import Header from '~/components/Header';
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { useState } from 'react';
import { useRouter } from 'next/router';

import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { uploadCover } from '~/services/s3';
import ErrorPage from 'next/error';
import TagsInput from '~/components/new/TagsInput';

export default function Component() {
    const session = useSession();
    const user = session.data?.user;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("**Hello world!!!**");
    const [tags, setTags] = useState<string[]>([]);
    const [cover, setCover] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [pending, setPending] = useState(false);

    const router = useRouter()
    const mutation = api.blog.create.useMutation({ onSuccess: async (data) => {
        await router.push("/blog/" + data.slug)

        if (selectedFile) {
            await uploadCover(data.id, selectedFile);
            setCover(data.cover);
            setSelectedFile(undefined); // avoid re-upload
        }

        setPending(false);
        // setNotification(true);
    } })


    if(!user) {
        return <ErrorPage statusCode={404} />;
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        setSelectedFile(files[0]);
    }

    const handleMutation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setPending(true);
        let cover = "";
        if (selectedFile) {
            cover = "https://devto-clone.s3.amazonaws.com/cover/" + selectedFile.name;
        }
        mutation.mutate({ title, content, tags, cover });
    }

    return (
        <>
            <Header />
            <div className="container bg-gray-100 min-h-screen pt-14">
                {/* Create new blog page */}
                <div className=" mx-auto p-4">
                        <h1 className="text-3xl font-bold my-4">Create a new blog</h1>
                    <div className="bg-white p-8 rounded-lg border">
                        <div className="mt-2 flex gap-3 items-center">
                            <img className="w-[40%] rounded-lg" src={cover ? cover : "https://placehold.co/600x300"}/>
                            <div>
                                <Label>Add your cover image</Label>
                                <Input
                                    type="file" 
                                    onChange={handleFileInput}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            <input 
                                className="w-full p-2 border border-gray-300 rounded-lg" 
                                type="text" 
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TagsInput onTagsChange={setTags} />
                            <div>
                                <MdEditor modelValue={content} onChange={setContent} language='en-US'/>
                            </div>
                            <Button className="w-full p-2" onClick={handleMutation} disabled={pending}>Create</Button>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}
