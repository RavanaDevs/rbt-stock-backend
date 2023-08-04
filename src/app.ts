import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

import home from "./routes/home";
import badRequest from "./middlewares/bad-request";

import productRouter from "./routes/product";
import userRouter from "./routes/users";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", home);
app.use("/products", productRouter);
app.use("/users", userRouter);

// undefined endpoint
app.use(badRequest);

// error handler middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred!";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});

export default app;
