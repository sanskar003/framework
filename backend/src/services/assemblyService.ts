import { AppError } from "../middleware/AppError";
import Assembly, { IAssemblyChild }  from "../models/Assembly"
import Part from "../models/Part";
import Product from "../models/Product"

//FIND AN ASSEMBLY USING PARENT BARCODE
export const assemblyService = async (parentBarcode: string) => {
    const assembly = await Assembly.findOne({parentBarcode});
    return assembly;
    
}

//ADD CHILD PART TO EXISTING ASSEMBLY
export const addPartToAssemblyService = async (
    parentBarcode: string, 
    childBarcode: string
) => {
  
    //FIND THE ASSEMBLY USING PARENT BARCODE
    const assembly = await Assembly.findOne({parentBarcode});
    if(!assembly) throw new AppError("Assembly part not found", 404)
    //DO NOT ALLOW CHILD PART TO BE ADDED TO COMPLETED ASSEMBLY 
    if(assembly.status === "COMPLETE") throw new AppError("The assembly is completed, Scan next Parent part", 409)

    //FIND THE CHILD PART USING ITS BARCODE
    const part = await Part.findOne({barcode: childBarcode});
    if(!part) throw new AppError("Part not found", 404)

    //FIND THE PRODUCT CONFIGURATIONS FOR THIS ASSEMBLY
    const product = await Product.findOne({productCode: assembly?.productCode})
    if(!product) throw new AppError("Product configuration not found", 404)
    //CHECK IF THE SCANNED PART TYPE IS REQUIRED FOR THE PRODUCT 
    if(!product.requiredPartTypes.includes(part.partType)) throw new AppError(`This part is not required for ${product.productCode}`, 409)
    
    //CHECK IF THIS CHILD BARCODE IS ALREADY ADDED TO THIS ASSEMBLY
    const alreadyAdded = assembly.children.some(
        (child: IAssemblyChild) => child.barcode === part.barcode
    )
    if(alreadyAdded) throw new AppError("This part is already added", 409)
    
    //CHECK IF ANOTHER PART OF THE SAME TYPE IS ALREADY ADDED
        const alreadyAddedPartType = assembly.children.some(
        (child: IAssemblyChild) => child.partType === part.partType
    )
    if(alreadyAddedPartType) throw new AppError("This part type is already added", 409)
    
    //CHECK IF CHILD PART ALREADY ADDED TO ANOTHER ASSEMBLY
    const childInAnotherAssembly = await Assembly.findOne({
        parentBarcode: { $ne: parentBarcode },
        "children.barcode": part.barcode
    })
    if (childInAnotherAssembly) throw new AppError("This part is already used in another assembly", 409);
    
    //ADD VALID CHILD PART TO ASSEMBLY
    assembly.children.push({
        partNumber: part.partNumber,
        partType: part.partType,
        barcode: part.barcode
    });

    //CHECK IF ALL REQUIRED PARTS ADDED
    const allPartAdded = product.requiredPartTypes.every((requiredPartType: string) => 
            assembly.children.some((child: IAssemblyChild) => child.partType === requiredPartType)
    )
    if(allPartAdded){
        assembly.status = "COMPLETE"
    }

    //SAVE THE UPDATED ASSEMBLY TO MONGODB
    await assembly.save()

    
    return { assembly, part, product };
}