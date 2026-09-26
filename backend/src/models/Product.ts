import mongoose, { Schema, Document } from "mongoose";

export interface IProductImage {
    imageType: 
    | "MAIN_FRAME"
    | "BUTTON_LAYER"
    | "CIRCUIT_BOARD"
    | "FRONT_LED"
    | "BATTERY_COMPARTMENT";
    imageUrl: string;
    publicId: string;
}

export interface IProduct extends Document{
    productCode: string;
    name: string;
    requiredPartTypes : string[];
    images: IProductImage[];
}

const productSchema = new mongoose.Schema<IProduct>(
    {
        productCode:{
            type: String,
            required: true,
            unique: true
        },

        name:{
            type: String,
            required: true,
        },
        
        requiredPartTypes:{
            type: [String],
            required: true
        },

        images: {
            type: [
                {
                    imageType: { type: String, required: true },
                    imageUrl: { type: String, required: true },
                    publicId: { type: String, required: true }
                }
            ],
            default: []
        }
    
    },{ timestamps: true },
)

const Product = mongoose.models.Product ||  mongoose.model<IProduct>("Product", productSchema);
export default Product;