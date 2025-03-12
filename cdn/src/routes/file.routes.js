const { Router } = require("express");
const fileController = require("../controllers/file.controller.js");
const { authenticate } = require("../../../src/middlewares/auth.middleware.js");
const { requireRole } = require("../../../src/middlewares/role.middleware.js");
const fileRoutes = Router();

fileRoutes.post("/upload", authenticate, requireRole(["admin", "student", "teacher"]), fileController.upload);

module.exports = fileRoutes;