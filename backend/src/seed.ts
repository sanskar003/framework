import dotenv from "dotenv"
import connectDB from "./config/db"
import Product from "./models/Product"
import Assembly from "./models/Assembly"
import Part from "./models/Part"
import { products, parts, parents } from "./data/seedData"

dotenv.config();

const seedDatabase = async() => {
    try{
        await connectDB();

        console.log("Inserting products...")
        await Product.insertMany(products);

        console.log("Inserting parts...")
        await Part.insertMany(parts);

        console.log("Creatig assembies...")
        const assemblies = parents.map((parent) => ({
            assemblyNumber: parent.assemblyNumber,
            productCode: parent.productCode,
            parentBarcode: parent.barcode,
            status: "PENDING" as const,
            children: [],
        }));
        await Assembly.insertMany(assemblies);

        console.log("DB seeded successfully")

        process.exit(0);
    }catch(error){
        console.log("error :", error);
        process.exit(1);
    }
}

seedDatabase();