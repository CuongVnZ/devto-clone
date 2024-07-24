/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const getClient = () => {
  return new S3Client({
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
    },
  });
}

const uploadAvatar = async (key: string, fileContent: File) => {

  // Create S3 client
  const s3Client = getClient();

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

const uploadCover = async (key: string, fileContent: File) => {
  
    // Create S3 client
    const s3Client = getClient();
  
    // get extension frome filename
    const ext = fileContent.name.split('.').pop();
    key = "cover/" + key + "." + ext;
  
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

export { uploadAvatar, uploadCover };