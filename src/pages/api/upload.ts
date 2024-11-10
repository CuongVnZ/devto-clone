import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { s3Helper } from "~/lib/buildHelpers";
import { authOptions } from "~/server/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const form = new IncomingForm();
    const [fields, files] = await form.parse(req);

    const uploadedFiles = files.file;
    if (!uploadedFiles?.[0]) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = uploadedFiles[0];
    const folder = fields.folder?.[0] ?? "avatar";

    // Read the file into a Buffer to match the File type expected by uploadAvatar
    const fileBuffer = await fs.readFile(file.filepath);

    // Updated to use the folder from form data
    const imageUrl = await s3Helper.uploadFile(
      "devto-clone",
      folder,
      session.user.id,
      fileBuffer,
    );

    // Clean up the temp file
    await fs.unlink(file.filepath);

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
}
