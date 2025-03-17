const { Router } = require("express");
const questionController = require("../controllers/test.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const questionRoutes = Router();

questionRoutes.get("/", authenticate, requireRole(["admin", "teacher", "student"]), questionController.getAllTest);
questionRoutes.get("/teacher/tests", authenticate, requireRole(["admin", "teacher", "student"]), questionController.getByTeacher);
questionRoutes.post("/", authenticate, requireRole(["admin", "teacher"]), questionController.createTest);

questionRoutes.get("/test/:id", authenticate, requireRole(["admin", "teacher", "student"]), questionController.getTestQuestions);

questionRoutes.post("/check/:id", authenticate, requireRole(["student"]), questionController.checkAnswers);

questionRoutes.put("/:id", authenticate, requireRole(["admin", "teacher"]), questionController.updateTest);

questionRoutes.delete("/:id", authenticate, requireRole(["admin", "teacher"]), questionController.deleteTest);


module.exports = questionRoutes;