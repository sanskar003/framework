import { Request, Response, NextFunction } from "express";
import { productService, uploadProductImagesService, uplodeProductImageService } from "../services/productService";


export const productController = async (
    req: Request<{ productCode: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        let productCode = req.params.productCode
        const result = await productService(productCode);
        res.json({ success: true, data: result })
    } catch (error: any) {
        console.log("Error :", error);
        next(error);
    }
}


export const productImageController = async (
    req: Request<{ productCode: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            throw new Error("Image is required")
        }

        const productCode = req.params.productCode;
        const imageType = req.body.imageType;
        const buffer = req.file.buffer;
        console.log("Product code:", req.params.productCode);
        console.log("Image type:", req.body.imageType);
        console.log("File:", req.file);

        const result = await uplodeProductImageService(productCode, imageType, buffer)
        res.json({
            success: true,
            message: "Image uploded successfully",
            imageUrl: result.secure_url,
            publicId: result.public_id
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const productImagesController = async (
    req: Request<{productCode: string}>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.files) {
            throw new Error("Images are required");
        }

        const productCode = req.params.productCode;

        const result = await uploadProductImagesService(
            productCode,
            req.files as { [fieldname: string]: Express.Multer.File[] }
        );


        let statusCode = 200, success = true, message = "All images uploaded successfully";
        if(result.uploaded.length === 0){
            statusCode = 409;
            success = false;
            message = "No images were uploaded";
        }
        else if(result.failed.length > 0){
            statusCode = 207;
            success = false;
            message = "Some images could not be uploaded";
        }

        res.status(statusCode).json({
            success,
            message,
            productCode,
            uploaded: result.uploaded,
            failed: result.failed
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}