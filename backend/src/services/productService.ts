import { AppError } from "../middleware/AppError";
import Product, { IProductImage } from "../models/Product"
import { uploadToCloudinary } from "./cloudinaryService";

export const productService = async (productCode: string) => {
    let product = await Product.findOne({ productCode });
    if (!product) {
        throw new AppError("Product not found", 404)
    }
    return product;
}

export const uplodeProductImageService = async (
    productCode: string,
    imageType: string,
    buffer: Buffer,
) => {
    let product = await Product.findOne({ productCode })
    if (!product) {
        throw new Error("Product not found")
    }

    const alreadyExist = product.images.some((image: IProductImage) => image.imageType === imageType)
    if (alreadyExist) {
        throw new Error("This image is already been registered")
    }

    const result = await uploadToCloudinary(
        buffer,
        `assembly-tracker/products/${productCode}`
    )


    product.images.push({
        imageType,
        imageUrl: result.secure_url,
        publicId: result.public_id,
    })

    await product.save()

    return result;
}

export const uploadProductImagesService = async (
    productCode: string,
    files: { [fieldname: string]: Express.Multer.File[] }
) => {
    const product = await Product.findOne({ productCode });
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    const uploaded = [];
    const failed = [];

    for (const imageType in files) {
        const file = files[imageType][0];

        const alreadyExist = product.images.some(
            (image: IProductImage) => image.imageType === imageType
        )

        if (alreadyExist) {
            failed.push({
                imageType,
                code: "IMAGEA_ALREADY_EXISTS",
                message: "Image already exists"
            })
            continue;
        }

        try {
            const result = await uploadToCloudinary(
                file.buffer,
                `assembly-tracker/products/${productCode}`
            )

            product.images.push({
                imageType,
                imageUrl: result.secure_url,
                publicId: result.public_id
            })

            uploaded.push({
                imageType,
                imageUrl: result.secure_url,
                publicId: result.public_id
            })
        } catch (error) {
            console.log(`Failed to upload ${imageType}:`, error);

            failed.push({
                imageType,
                code: "IMAGE_UPLOAD_FAILED",
                message: "image Upload failed",
            });
        }

    }
    await product.save();

    return { uploaded, failed };
}