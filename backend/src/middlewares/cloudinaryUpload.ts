import { Request, Response, NextFunction } from "express";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import { logger } from "../utils/logger.ts";

export const cloudinaryUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await uploadStream(req);

  if (!result) {
    logger.debug("No profile_picture sent");
    next();
  } else {
    logger.debug("profile_picture sent!");
    req.body.profile_picture = result.url;
    next();
  }
};

const uploadStream = (req: Request): any => {
  if (!req.file) return null;

  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        public_id: `${req.body.first_name}_${req.body.last_name}`,
        asset_folder: "profile_pictures",
      },
      (error, result) => {
        if (result) {
          console.log(result);
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file!.buffer).pipe(stream);
  });
};
