import { InferSchemaType, Schema, model } from "mongoose";
import Joi from "joi";

const schema = new Schema(
  {
    token: { type: String, required: true },
  },
  { timestamps: true }
);

type Token = InferSchemaType<typeof schema>;
export default model<Token>("token", schema);

export const validateUserOnCreate = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().trim().required(),
  });
  const { error, value } = schema.validate(data);
  return { error, value };
};
