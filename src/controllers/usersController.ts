import { User, UserStore } from "../models/users";
import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../middleware/authUser";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const store = new UserStore();
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body.first_name || !req.body.last_name || !req.body.password) {
      throw new Error("Missing required fields");
    }
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const result = await store.create(user);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await store.show(req.body.id);

    if (!user) {
      throw new Error("User not found");
    }
    if (
      !(await bcrypt.compare(
        req.body.password + process.env.PEPPER,
        user.password
      ))
    ) {
      throw new Error("Password is incorrect");
    }
    const token = jwt.sign(
      { id: user.id, firstName: user.first_name, lastName: user.last_name },
      process.env.JWT_SECRET as string
    );
    res.status(200).json({
      id: (user as User).id,
      token,
      first_name: (user as User).first_name,
      last_name: (user as User).last_name,
    });
  } catch (error) {
    next(error);
  }
};
export const index = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User Not Found");
    }

    const users = await store.index();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const show = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User Not Found");
    }
    const result = await store.show(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
