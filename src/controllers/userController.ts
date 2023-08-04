import { RequestHandler } from "express";
import user, { validateUserOnCreate } from "../models/user";
import { hash } from "bcrypt";

export const createUser: RequestHandler = async (req, res, next) => {

  const { error, value } = validateUserOnCreate(req.body);
  if (error) return next(error);

  try {
    const username = value.username;
    const password = value.password;
    const hashedPassword = await hash(password,10);

    const newUser =  await user.create({username:username, password:hashedPassword})
    return res.status(201).json(newUser);

  } catch (error) {
    return next(error);
  }
};
