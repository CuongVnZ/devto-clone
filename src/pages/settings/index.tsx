/* eslint-disable react/no-unescaped-entities */
import { useSession } from "next-auth/react";
import ErrorPage from "next/error";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import Header from "~/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { uploadAvatar } from "~/services/s3";
import {
  AccountBoxOutlined,
  ManageAccounts,
  NotificationsNone,
  Tune,
} from "@mui/icons-material";
import { Snackbar } from "@mui/material";

export default function Component() {
  const session = useSession();
  const user = session.data?.user;

  const { data: profile } = api.user.getById.useQuery(
    { id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const [selectedFile, setSelectedFile] = useState<File>();
  const [updatePending, setUpdatePending] = useState(false);

  const [notification, setNotification] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification(false);
  };

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.fullName ?? "");
    setEmail(profile.email ?? "");
    setUsername(profile.name ?? "");
    setImage(profile.image ?? "");
    setWebsite(profile.website ?? "");
    setLocation(profile.location ?? "");
    setBio(profile.bio ?? "");
  }, [profile]);

  const mutation = api.user.update.useMutation({
    onSuccess: () => {
      setUpdatePending(false);
      setNotification(true);
    },
  });

  if (!user) {
    return <ErrorPage statusCode={404} />;
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setSelectedFile(files[0]);
  };

  const handleMutation = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setUpdatePending(true);
    if (selectedFile) {
      const res = await uploadAvatar(user?.id, selectedFile);
      setImage(res);
      setSelectedFile(undefined); // avoid re-upload
    }
    mutation.mutate({ fullName, email, name: username, image });
  };

  return (
    <>
      <Header />
      <main className="flex bg-gray-100 min-h-screen pt-14 justify-center">
        <div className="w-64 p-4">
          <nav className="flex-col text-gray-700">
            <li className="flex items-center bg-white rounded-md p-2 hover:cursor-pointer">
              <AccountBoxOutlined />
              <a className="ml-2">Profile</a>
            </li>
            <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
              <Tune />
              <a className="ml-2">Customization</a>
            </li>
            <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
              <NotificationsNone />
              <a className="ml-2">Notification</a>
            </li>
            <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
              <ManageAccounts />
              <a className="ml-2">Account</a>
            </li>
          </nav>
        </div>
        <div className="w-1/2 p-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">@{user?.name}</h1>
          <div className="bg-white p-8 rounded-lg border">
            <h1 className="text-2xl mb-4 font-bold">User</h1>
            <form className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile image
                </label>
                <div className="mt-2 flex items-center space-x-2">
                  <Avatar className="w-8 h-8 rounded-full">
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Input type="file" onChange={handleFileInput} />
                </div>
              </div>
            </form>
          </div>
          <div className="bg-white p-8 rounded-lg border">
            <h1 className="text-2xl mb-4 font-bold">Basic</h1>
            <form className="space-y-4">
              <div>
                <Label className="text-gray-700">Website URL</Label>
                <Input
                  type="text"
                  placeholder="www.example.com"
                  value={website}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-gray-700">Location</Label>
                <Input
                  type="text"
                  placeholder="Australia"
                  value={location}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-gray-700">Bio</Label>
                <Input
                  type="text"
                  placeholder="404 bio not found"
                  value={bio}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </form>
          </div>
          <Button
            className="w-full p-2"
            onClick={handleMutation}
            disabled={updatePending}
          >
            Save
          </Button>
        </div>
      </main>
      <Snackbar
        open={notification}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Your data has been saved!"
      />
    </>
  );
}
