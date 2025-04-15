import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

type AssetFolders = "profile_picture" | "patient_tongue_image";

export const uploadImage = (asset_folder: AssetFolders) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await uploadStream(req, asset_folder);

    if (!result) {
      logger.debug("No profile_picture sent");
      next();
    } else {
      logger.debug("profile_picture sent!");
      req.body[asset_folder] = result.url;
      next();
    }
  };
};

const uploadStream = (req: Request, asset_folder: AssetFolders): any => {
  if (!req.file) return null;

  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        asset_folder,
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
