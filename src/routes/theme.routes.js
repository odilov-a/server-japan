const { Router } = require("express");
const themeController = require("../controllers/theme.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const themeRouter = Router();

themeRouter.get("/", authenticate, requireRole(["admin", "student"]), themeController.getAllThemes);
themeRouter.post("/", authenticate, requireRole(["admin"]), themeController.createTheme);

themeRouter.get("/:id", authenticate, requireRole(["admin"]), themeController.getThemeById);
themeRouter.put("/:id", authenticate, requireRole(["admin"]), themeController.updateTheme);
themeRouter.delete("/:id", authenticate, requireRole(["admin"]), themeController.deleteTheme);

module.exports = themeRouter;
