import { Router } from "express";
import { index, show, create } from "../../controllers/productController";
import authUser from "../../middleware/authUser";

const productRouter = Router();

productRouter.get("/", index);
productRouter.get("/:id", show);
productRouter.post("/", authUser, create);

export default productRouter;
