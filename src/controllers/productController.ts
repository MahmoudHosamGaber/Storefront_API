import { Product, ProductStore } from "../models/products";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
const store = new ProductStore();

export const index = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const products = await store.index();
    res.status(200).json(products);
  }
);

export const show = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await store.show(req.params.id);
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  }
);

export const create = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
      name: req.body.name as string,
      price: req.body.price as string,
    };
    const result = await store.create(product);
    res.status(201).json(result);
  }
);
