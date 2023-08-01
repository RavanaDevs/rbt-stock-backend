import "dotenv/config";
import app from "./app";
// import env from "./utils/validate-env";
import mongoose from "mongoose";

const port = process.env.PORT || 5000;

if (process.env.MONGODB_CONN_STRING) {
  mongoose.connect(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(port, () => {
      console.log("server is listing on port: " + port);
    });
  });
}
