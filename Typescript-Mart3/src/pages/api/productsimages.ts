import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error("API Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: "Method does not allow" });
  },
});

handler.use(upload.single("file") as any);
// In postman use form-data and key as file!

handler.post(async (req: any, res) => {
  console.log("POST request taken", req.file ? "File ok" : "File none", req.body);
  
  if (!req.file) {
    return res.status(400).json({ error: "File uploaded" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    return res.status(200).json({ message: "Uploaded", result });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed:" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;