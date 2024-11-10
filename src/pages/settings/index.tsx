/* eslint-disable react/no-unescaped-entities */
import { zodResolver } from "@hookform/resolvers/zod";
import { BellIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import ErrorPage from "next/error";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header from "~/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/utils/api";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().min(1, "Username is required"),
  image: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  location: z.string().optional(),
  bio: z.string().optional(),
  showEmail: z.boolean().default(false),
  avatarFile: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Component() {
  const session = useSession();
  const user = session.data?.user;

  const { data: profile } = api.user.getById.useQuery(
    { id: user?.id ?? "" },
    { enabled: user !== undefined },
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      showEmail: false,
    },
  });

  useEffect(() => {
    if (!profile) return;
    setValue("fullName", profile.fullName ?? "");
    setValue("email", profile.email ?? "");
    setValue("username", profile.name ?? "");
    setValue("image", profile.image ?? "");
    setValue("website", profile.website ?? "");
    setValue("location", profile.location ?? "");
    setValue("bio", profile.bio ?? "");
  }, [profile, setValue]);

  const mutation = api.user.update.useMutation();

  if (!user) {
    return <ErrorPage statusCode={404} />;
  }

  const onSubmit = async (data: FormValues) => {
    if (data.avatarFile) {
      const formData = new FormData();
      formData.append("file", data.avatarFile);
      formData.append("folder", "avatar");

      const upload = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { imageUrl } = (await upload.json()) as { imageUrl: string };
      data.image = imageUrl;
    }

    const { avatarFile, showEmail, ...updateData } = data;
    mutation.mutate({
      fullName: updateData.fullName,
      email: updateData.email,
      image: updateData.image ?? "",
      name: updateData.username,
    });
  };

  return (
    <>
      <Header />
      <main className="flex bg-gray-100 min-h-screen pt-14 justify-center">
        <div className="w-64 p-4">
          <nav className="flex-col text-gray-700">
            <li className="flex items-center bg-white rounded-md p-2 hover:cursor-pointer">
              <UserIcon />
              <a className="ml-2">Profile</a>
            </li>
            <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
              <SettingsIcon />
              <a className="ml-2">Customization</a>
            </li>
            <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
              <BellIcon />
              <a className="ml-2">Notification</a>
            </li>
            <li className="flex items-center hover:bg-purple-100 rounded-md p-2 hover:cursor-pointer">
              <UserIcon />
              <a className="ml-2">Account</a>
            </li>
          </nav>
        </div>
        <div className="w-1/2 p-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">@{user?.name}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="bg-white p-8 rounded-lg border">
              <h1 className="text-2xl mb-4 font-bold">User</h1>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">Name</Label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-700">Email</Label>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="mt-2 flex items-center space-x-2">
                    <Checkbox {...register("showEmail")} id="showEmail" />
                    <label
                      htmlFor="showEmail"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Display email on profile
                    </label>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700">Username</Label>
                  <Input
                    type="text"
                    placeholder="johndoe"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-700">Profile image</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src={watch("image") ?? ""} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setValue("avatarFile", e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border">
              <h1 className="text-2xl mb-4 font-bold">Basic</h1>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">Website URL</Label>
                  <Input
                    type="text"
                    placeholder="www.example.com"
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm">
                      {errors.website.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-700">Location</Label>
                  <Input
                    type="text"
                    placeholder="Australia"
                    {...register("location")}
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Bio</Label>
                  <Input
                    type="text"
                    placeholder="404 bio not found"
                    {...register("bio")}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full p-2"
              disabled={isSubmitting}
            >
              Save
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
