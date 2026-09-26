import mongoose, { Schema, Document } from "mongoose";

export interface IPart extends Document {
    partNumber: string,
    partType: string,
    barcode: string
}

const partSchema = new mongoose.Schema<IPart>(
    {
        partNumber:{
            type: String,
            required: true,
        },

        partType:{
            type: String,
            required: true,
        },

        barcode:{
            type: String,
            required: true,
            unique: true,
        }
    }, { timestamps: true }
)

const Part = mongoose.models.Part || mongoose.model<IPart>("Part", partSchema);
export default Part;