/* eslint-disable react/no-unescaped-entities */
import { useSession } from 'next-auth/react';
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from '~/components/ui/input';
import { Button } from "~/components/ui/button";
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { uploadFile } from '~/services/s3';
import { AccountBoxOutlined, ManageAccounts, NotificationsNone, Tune } from '@mui/icons-material';

export default function Component() {
    const session = useSession();
    const user = session.data?.user;

    const { data: profile } = api.user.getById.useQuery({ id: user?.id}, { enabled: user !== undefined });

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [uploadPending, setUploadPending] = useState(false);
    
    useEffect(() => {
        if(!profile) return;
        setFullName(profile.fullName);
        setEmail(profile.email);
        setUsername(profile.name);
    }, [profile]);

    
    const mutation = api.user.update.useMutation();

    if(!user) {
        return <ErrorPage statusCode={404} />;
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        setSelectedFile(files[0]);
    }

    const handleMutation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!fullName || !email || !username || !selectedFile) return;
        setUploadPending(true);
        await uploadFile(user?.id, selectedFile).then((res) => {
            setUploadPending(false);
            mutation.mutate({ fullName, email, name: username, image: res });
        });

    }

    return (
        <>
            <Header />
            <main className="flex bg-gray-100 min-h-screen pt-14 justify-center">
                <div className="w-64 p-4">
                    <nav className='flex-col text-gray-700'>
                        <li className="flex items-center bg-white rounded-md p-2 hover:cursor-pointer">
                            <AccountBoxOutlined />
                            <a className='ml-2'>Profile</a>
                        </li>
                        <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
                            <Tune />
                            <a className='ml-2'>Customization</a>
                        </li>
                        <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
                            <NotificationsNone />
                            <a className='ml-2'>Notification</a>
                        </li>
                        <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
                            <ManageAccounts />
                            <a className='ml-2'>Account</a>
                        </li>
                    </nav>
                </div>
                <div className="w-1/2 p-4">
                    <h1 className="text-2xl font-bold mb-2">@{user?.name}</h1>
                    <div className="bg-white p-8 rounded-lg border">
                        <h1 className='text-2xl mb-4 font-bold'>User</h1>
                        <form className="space-y-4" onSubmit={handleMutation}>
                            <div>
                                <Label className="text-gray-700">Name</Label>
                                <Input 
                                    type="text" 
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className=" text-gray-700">Email</Label>
                                <Input 
                                    type="email" 
                                    placeholder="john.doe@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="mt-2 flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Display email on profile
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <Input 
                                    type="text" 
                                    placeholder="johndoe" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile image</label>
                                <div className="mt-2 flex items-center space-x-2">
                                    <Avatar className="w-8 h-8 rounded-full">
                                        <AvatarImage src={user.image ?? ''} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <Input
                                        type="file" 
                                        onChange={handleFileInput}
                                    />
                                </div>
                            </div>
                            <Button className="w-full p-2" disabled={uploadPending}>Save</Button>
                        </form>
                    </div>
                </div>
            </main>
        </> 
    );
}
