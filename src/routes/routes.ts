import { Router } from "express";
import userRouter from "./api/usersRoutes";
const router = Router();
router.use("/users", userRouter);

export default router;
