import { Router } from "express";
import userRouter from "./api/usersRoutes";
import productRouter from "./api/productRoutes";
import orderRouter from "./api/orderRoutes";

const router = Router();
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);

export default router;
