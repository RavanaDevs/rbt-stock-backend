import { InferSchemaType, Schema, model } from "mongoose";
import Joi from "joi";

const schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof schema>;
export default model<User>("user", schema);

export const validateUserOnCreate = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().trim().max(255).required(),
    password: Joi.string().required(),
  });
  const { error, value } = schema.validate(data);
  return { error, value };
};

export const validateUserOnUpdate = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().trim().max(255),
    password: Joi.string(),
  });
  const { error, value } = schema.validate(data);
  return { error, value };
};
