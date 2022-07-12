import { OrderStore } from "../models/orders";
import { UserRequest } from "../middleware/authUser";
import asyncHandler from "express-async-handler";
import { Response } from "express";

const store = new OrderStore();
export const getUserOrder = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user;
    const orders = await store.getUserOrder(user?.id as string);
    res.status(200).json(orders);
  }
);
