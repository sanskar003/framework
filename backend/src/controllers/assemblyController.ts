import { Request, Response, NextFunction } from "express";
import { addPartToAssemblyService, assemblyService } from "../services/assemblyService";

export const assemblyController = async (
    req: Request<{parentBarcode: string}>,
    res: Response,
    next: NextFunction
) => {
    try{
        let parentBarcode = req.params.parentBarcode;
        const result = await assemblyService(parentBarcode);
        res.json({ success: true, data: result });
    }catch(error){
        console.log("Error :", error);
        next(error);
    }
}

export const addPartToAssemblyController = async (
    req: Request<{parentBarcode: string}>,
    res: Response,
    next: NextFunction
) => {
    try {
        let parentBarcode = req.params.parentBarcode;
        let childBarcode = req.body.childBarcode;
        console.log(parentBarcode, childBarcode)
        const result = await addPartToAssemblyService(parentBarcode, childBarcode)
        res.json({ success: true, data: result })
    } catch (error) {
        console.log("Error :", error);
        next(error);
    }
}   