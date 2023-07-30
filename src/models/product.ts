import { InferSchemaType, Schema, model } from "mongoose";
import Joi from "joi";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    unit_count: { type: Number, required: true },
  },
  { timestamps: true }
);

type Product = InferSchemaType<typeof productSchema>;
export default model<Product>("product", productSchema);

export const validateProductOnCreate = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().trim().max(255).required(),
    unit_count: Joi.number().required(),
  });
  const { error, value } = schema.validate(data);
  return { error, value };
};

export const validateProductOnUpdate = (data: any) => {
    const schema = Joi.object({
      name: Joi.string().trim().max(255),
      unit_count: Joi.number(),
    });
    const { error, value } = schema.validate(data);
    return { error, value };
  };
