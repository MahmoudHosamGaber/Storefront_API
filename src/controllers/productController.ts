import { Product, ProductStore } from "../models/products";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
const store = new ProductStore();

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await store.show(req.params.id);
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name as string,
      price: req.body.price as string,
    };
    const result = await store.create(product);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
