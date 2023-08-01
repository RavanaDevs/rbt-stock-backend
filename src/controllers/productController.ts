import { RequestHandler } from "express";
import product, {
  validateProductOnCreate,
  validateProductOnUpdate,
} from "../models/product";

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const notes = await product.find().exec();
    return res.status(200).json(notes);
    
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  const { error, value } = validateProductOnCreate(req.body);

  if (error) return next(error);

  try {
    const newProduct = await product.create(value);
    return res.status(201).json(newProduct);

  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  const productID = req.params.id;
  const { error, value } = validateProductOnUpdate(req.body);

  if (error) return next(error);

  try {
    const doc = await product.findOneAndUpdate({ _id: productID }, value);
    return res.json({ message: "Record Updated." });

  } catch (error) {
    console.error(error);
    next(Error("Update operation faild!"));
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const productID = req.params.id;

  try {
    const doc = await product.deleteOne({ _id: productID });
    return res.json({ message: "Prodcut Deleted." });

  } catch (error) {
    console.error(error);
    next(Error("Delete operation faild!"));
  }
};
