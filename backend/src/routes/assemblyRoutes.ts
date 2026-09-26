import { Router } from "express";
import { addPartToAssemblyController, assemblyController } from "../controllers/assemblyController";

const router = Router();

router.get("/assembly/:parentBarcode", assemblyController);
router.post("/assembly/:parentBarcode/parts", addPartToAssemblyController);

export default router;