import { RequestHandler } from "express";
import user from "../models/user";
import { compareSync } from "bcrypt";
import { verify } from "jsonwebtoken";
import env from "../utils/validate-env";

export const checkUser: RequestHandler = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = await user.findOne({ username: username });
  if (!foundUser) return next(Error("User not found"));

  const pwdMatch = compareSync(password, foundUser.password);
  if (!pwdMatch) return next(Error("Incorrect Password"));

  req.body.user = foundUser;

  next();
};

export const auth: RequestHandler = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Access token not found");
    }
    verify(token, env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return next(err);

      req.body.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};
