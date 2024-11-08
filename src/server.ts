import app from "./app";
import env from "./utils/validate-env";
import mongoose from "mongoose";

const port = env.PORT || 5000;

mongoose.connect(env.MONGODB_CONN_STRING).then(() => {
  app.listen(port, () => {
    console.log("server is listing on port: " + port);
  });
});
