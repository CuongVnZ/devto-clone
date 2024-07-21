/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadFile = async (key: string, fileContent: File) => {

  // Create S3 client
  const s3Client = new S3Client({
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
    },
  });

  // get extension frome filename
  const ext = fileContent.name.split('.').pop();
  key = "avatar/" + key + "." + ext;

  // Set upload parameters
  const params = {
    Body: fileContent,
    Bucket: "devto-clone",
    Key: key,
    ContentType: fileContent?.type || ""
  };


  try {
    // Upload file to S3
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully", response);
    return "https://devto-clone.s3.amazonaws.com/" + key;
  } catch (error) {
    console.error("Error uploading file", error);
    // Throw error to the caller
    throw error;
  }
};

export { uploadFile };