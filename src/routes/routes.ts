import { Router } from "express";
import userRouter from "./api/usersRoutes";
import productRouter from "./api/productRoutes";

const router = Router();
router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
