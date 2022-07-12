import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User, UserStore } from "../models/users";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();
export interface UserRequest extends Request {
  user?: User;
}

const authUser = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      throw new Error("No token provided");
    }
    const user = new UserStore();
    const token = req.headers.authorization.split(" ")[1] as string;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    const userId = decoded.id;
    const currentUser = await user.show(userId as string);
    req.user = currentUser;
    next();
  }
);

export default authUser;
