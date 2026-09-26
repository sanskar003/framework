import mongoose, { Schema, Document } from "mongoose";

export interface IAssemblyChild{
    partNumber: string;
    partType: string;
    barcode: string;
}

export interface IAssembly extends Document {
    assemblyNumber: string,
    productCode: string,
    parentBarcode: string,
    status: "PENDING" | "COMPLETE",
    children: IAssembly[]
}
    
const assemblyChildSchema = new mongoose.Schema<IAssemblyChild>(
    {
        partNumber: {
            type: String,
            required: true,
        },

        partType: {
            type: String,
            required: true,
        },

        barcode: {
            type: String,
            required: true
        }
    }, { _id: false }
)

const assemblySchema = new mongoose.Schema<IAssembly>(
    {
        assemblyNumber: {
            type: String,
            required: true,
            unique: true,
        },

        productCode: {
            type: String,
            required: true,
        },

        parentBarcode: {
            type: String,
            required: true,
            unique: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "COMPLETE"],
            default: "PENDING",
            required: true,
        },

        children: {
            type: [assemblyChildSchema],
            default: [],
        }
    },{ timestamps: true }
)

const Assembly = mongoose.models.Assembly || mongoose.model<IAssembly>("Assembly", assemblySchema);
export default Assembly