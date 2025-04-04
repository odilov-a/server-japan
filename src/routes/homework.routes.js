const { Router } = require("express");
const homeworkController = require("../controllers/homework.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const homeworkRouter = Router();

homeworkRouter.get("/", authenticate, requireRole(["teacher"]), homeworkController.getAllHomeworks);
homeworkRouter.post("/", authenticate, requireRole(["teacher"]), homeworkController.createHomework);
homeworkRouter.put("/:id", authenticate, requireRole(["teacher"]), homeworkController.updateHomework);

module.exports = homeworkRouter;
