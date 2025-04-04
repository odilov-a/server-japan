const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
dotenv.config();
require("./src/backup.js");
require("./src/utils/homework.js");
require("./src/connection.js");

const router = require("./src/routes/router.js");
const { requestLogger } = require("./src/middlewares/request.middleware.js");
const PORT = 7000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(requestLogger);
app.use("/api", router);

app.get("/", (req, res) => {
  return res.json({ message: "API server is running!" });
});

function startServerOnPort(port) {
  const listen = app.listen(port, "0.0.0.0", () => {
    console.log(`API is running on port ${port}`);
  });

  listen.on("error", (error) => {
    console.log(`Port ${port} is busy. Trying a different port...`);
    startServerOnPort(port + 1);
  });
}

startServerOnPort(PORT);
