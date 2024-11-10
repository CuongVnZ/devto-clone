/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class S3Helper {
  private getClient() {
    return new S3Client({
      region: "ap-southeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });
  }

  async uploadFile(
    bucket: string,
    folder: string,
    key: string,
    fileContent: Buffer,
  ) {
    // Create S3 client
    const s3Client = this.getClient();

    // Set key for avatar
    const path = folder + "/" + key;

    // Set upload parameters
    const params = {
      Body: fileContent,
      Bucket: bucket,
      Key: path,
      ContentType: "image/jpeg",
    };

    try {
      // Upload file to S3
      const command = new PutObjectCommand(params);
      const response = await s3Client.send(command);
      console.log("File uploaded successfully", response);
      return "https://devto-clone.s3.amazonaws.com/" + path;
    } catch (error) {
      console.error("Error uploading file", error);
      // Throw error to the caller
      throw error;
    }
  }
}
