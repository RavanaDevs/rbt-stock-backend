import { RequestHandler } from "express";
import { sign, verify } from "jsonwebtoken";
import env from "../utils/validate-env";
import tokenModel from "../models/token";
import { deleteToken, saveToken } from "../services/token-service";

export const login: RequestHandler = async (req, res, next) => {
  const token = generateAccessToken(req.body.user);
  const refreshToken = sign(
    { _id: req.body.user._id, username: req.body.user.username },
    env.REFRESH_TOKEN_SECRET
  );

  await saveToken(refreshToken);

  return res
    .status(200)
    .json({ accessToken: token, refreshToken: refreshToken });
};

export const logout: RequestHandler = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return next(Error("Invalid refresh token"));
  try {
    await deleteToken(refreshToken);
    return res.status(201).json({ message: "Token deleted" });
  } catch (error) {
    return next(error);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  const token = req.body.token;
  try {
    if (!token) return next(Error("Refresh token empty"));

    const validToken = await tokenModel.findOne({ token: token });
    console.log(validToken);
    if (!validToken) return next(Error("Refresh token invalid"));

    verify(validToken.token, env.REFRESH_TOKEN_SECRET, (error, user: any) => {
      if (error) return next(error);

      const newUser = { _id: user._id, username: user.username };
      const accessToken = generateAccessToken(newUser);

      res.status(200).json({ accessToken: accessToken, refreshToken: token });
    });
  } catch (error) {
    return next(error);
  }
};

function generateAccessToken(user: any) {
  return sign(
    { _id: user._id, username: user.username },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "20s",
    }
  );
}
