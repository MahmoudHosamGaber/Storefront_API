import { Router } from "express";
import { getUserOrder } from "../../controllers/orderController";
import authUser from "../../middleware/authUser";

const orderRouter = Router();

orderRouter.get("/", authUser, getUserOrder);

export default orderRouter;
