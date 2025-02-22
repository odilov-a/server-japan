const fs = require("fs");
const path = require("path");
const logFolder = path.join(__dirname, "../log");

const ensureLogFolderExists = () => {
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder, { recursive: true });
  }
};

const logFileName = () => {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()}`;
  return path.join(logFolder, `${formattedDate}.requests.log`);
};

const requestLogger = (req, res, next) => {
  ensureLogFolderExists();
  let logEntry =
    `\n[${new Date().toISOString()}] ${req.method} ${req.path}\n` +
    `Headers: ${JSON.stringify(req.headers, null, 2)}\n` +
    `Body: ${JSON.stringify(req.body, null, 2)}\n`;
  if (req.body && req.body["form-data"]) {
    logEntry += `Body from data: ${JSON.stringify(
      req.body["form-data"],
      null,
      2
    )}\n`;
  }
  fs.appendFile(logFileName(), logEntry, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    }
  });
  next();
};

module.exports = { requestLogger };