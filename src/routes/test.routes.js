const { Router } = require("express");
const testController = require("../controllers/test.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const testRouter = Router();

testRouter.get("/", authenticate, requireRole(["admin", "student"]), testController.getAllTests);
testRouter.post("/", authenticate, requireRole(["admin"]), testController.createTest);

testRouter.get("/:id", authenticate, requireRole(["admin"]), testController.getTestById);
testRouter.put("/:id", authenticate, requireRole(["admin"]), testController.updateTest);
testRouter.delete("/:id", authenticate, requireRole(["admin"]), testController.deleteTest);

module.exports = testRouter;
