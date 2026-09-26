import { Request, Response, NextFunction } from "express";
import { partService } from "../services/partService";

export const partController = async (
    req: Request<{barcode: string}>,
    res: Response,
    next: NextFunction
) => {
    try{
        let barcode = req.params.barcode;
        const result = await partService(barcode)
        res.json({success: true, data: result});
    }catch(error){
        console.log("Error :", error);
        next(error);
    }
}