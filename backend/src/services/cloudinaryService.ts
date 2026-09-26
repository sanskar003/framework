import { UploadApiResponse } from "cloudinary"
import cloudinary from "../config/cloudinary"

export const uploadToCloudinary = (
    buffer: Buffer,
    folder: string
): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder, resource_type: "image"},
            (error, result) => {
                if(error) reject(error)
                else resolve(result!)
            }
        )

        stream.end(buffer)
    })
}