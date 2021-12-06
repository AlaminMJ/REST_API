const express = require("express");
const { PORT, DB_URL } = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("bd connected");
    }
  }
);
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Error Handel middle were
app.use(errorHandler);
// Server create
const port = PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
