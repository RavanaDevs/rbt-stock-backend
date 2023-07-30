import { RequestHandler } from "express";

const badRequest: RequestHandler = (req, res, next) => {
  next(Error("Endpoint not found"));
};

export default badRequest;
