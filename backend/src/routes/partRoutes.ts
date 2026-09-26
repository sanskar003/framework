import { Router } from "express";
import { partController } from "../controllers/partController";

const router = Router();

router.get("/part/:barcode", partController);

export default router;