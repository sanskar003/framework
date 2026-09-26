import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import product from "./routes/productRoutes"
import part from "./routes/partRoutes"
import assembly from "./routes/assemblyRoutes"
import { errorHandler } from "./middleware/errorHandler";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({message: "Assembly tracking is running"})
})


app.use("/api/", product)
app.use("/api/", part)
app.use("/api/", assembly)

//ERROR HANDLER MIDDLEWARE
app.use(errorHandler)


const PORT = "5000"
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});