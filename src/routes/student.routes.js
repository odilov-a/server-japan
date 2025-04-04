const { Router } = require("express");
const studentController = require("../controllers/student.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const studentRouter = Router();

studentRouter.post("/login", studentController.loginStudent);
studentRouter.post("/register", authenticate, requireRole(["admin", "teacher"]), studentController.registerStudent);

studentRouter.get("/", authenticate, requireRole(["admin", "teacher"]), studentController.getAllStudents);
studentRouter.get("/me", authenticate, requireRole(["student"]), studentController.getMeStudent);
studentRouter.get("/search", authenticate, requireRole(["admin", "teacher"]), studentController.searchStudentByFirstNameLastName);

studentRouter.put("/update-student", authenticate, requireRole(["student"]), studentController.meUpdateStudent);

studentRouter.get("/:id", authenticate, requireRole(["admin", "teacher"]), studentController.getStudentById);
studentRouter.put("/:id", authenticate, requireRole(["admin", "teacher"]), studentController.updateStudent);
studentRouter.delete("/:id", authenticate, requireRole(["admin", "teacher"]), studentController.deleteStudent);

module.exports = studentRouter;
