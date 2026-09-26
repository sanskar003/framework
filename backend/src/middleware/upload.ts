import multer from "multer";

const storage = multer.memoryStorage()

const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jfif"];

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else cb(new Error("Only JPEG, PNG, JFIF and WEBP images are allowed"))
}

export const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});
