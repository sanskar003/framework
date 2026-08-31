import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";

const app = express();

app.get("/health", (req, res) => {
    res.json({success:true, server: "running"})
});

const PORT = "https://localhost:3000"
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});