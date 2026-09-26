import { AppError } from "../middleware/AppError";
import Part from "../models/Part"

export const partService = async (barcode: string) => {
    const part = await Part.findOne({barcode});
    if(!part){
        throw new AppError("Part not found", 404)
    }
    return part;
}