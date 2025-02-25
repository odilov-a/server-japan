const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("../src/connection.js");
const router = require("./src/routes/router.js");
const { requestLogger } = require("../src/middlewares/request.middleware.js");
const PORT = 7001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use("/api", router);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  return res.json({ message: "CDN server is running!" });
});

function startServerOnPort(port) {
  const listen = app.listen(port, "0.0.0.0", () =>
    console.log(`CDN Server is running on port ${port}`)
  );
  listen.on("error", () => {
    console.log(`Port ${port} is busy. Trying a different port...`);
    startServerOnPort(port + 1);
  });
}

startServerOnPort(PORT);
