import { Router } from "express";
import { productController, productImageController, productImagesController } from "../controllers/productController";
import { upload } from "../middleware/upload";


const router = Router();

router.get("/product/:productCode", productController)

router.post("/product/:productCode/image", upload.single("image"), productImageController)

router.post("/product/:productCode/images", upload.fields([
    {name: "MAIN_FRAME", maxCount: 1},
    {name: "BUTTON_LAYER", maxCount: 1},
    {name: "CIRCUIT_BOARD", maxCount: 1},
    {name: "FRONT_LED", maxCount: 1},
    {name: "BATTERY_COMPARTMENT", maxCount: 1},
]), productImagesController)

export default router