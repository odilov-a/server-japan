const { Router } = require("express");
const themeController = require("../controllers/theme.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const themeRouter = Router();

themeRouter.get("/", authenticate, requireRole(["admin", "teacher"]), themeController.getAllThemes);
themeRouter.get("/student", authenticate, requireRole(["student"]), themeController.getAllThemesForStudents);
themeRouter.get("/teacher/themes", authenticate, requireRole(["admin", "teacher"]), themeController.getThemeByTeacher);
themeRouter.post("/", authenticate, requireRole(["admin", "teacher"]), themeController.createTheme);

themeRouter.get("/:id", authenticate, requireRole(["admin", "teacher"]), themeController.getThemeById);
themeRouter.put("/:id", authenticate, requireRole(["admin", "teacher"]), themeController.updateTheme);
themeRouter.delete("/:id", authenticate, requireRole(["admin", "teacher"]), themeController.deleteTheme);

module.exports = themeRouter;
