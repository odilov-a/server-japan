const { Router } = require("express");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const passedController = require("../controllers/passed.controller");

const passedRoutes = Router()

passedRoutes.get("/", authenticate, requireRole(["admin", "teacher"]), passedController.getAllPassed);

module.exports = passedRoutes;