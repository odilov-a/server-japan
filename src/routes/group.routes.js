const { Router } = require("express");
const groupController = require("../controllers/group.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const { requireRole } = require("../middlewares/role.middleware.js");
const groupRouter = Router();

groupRouter.get("/", authenticate, requireRole(["admin"]), groupController.getAllGroups);
groupRouter.post("/", authenticate, requireRole(["admin"]), groupController.createGroup);

groupRouter.get("/:id", authenticate, requireRole(["admin"]), groupController.getGroupById);
groupRouter.put("/:id", authenticate, requireRole(["admin"]), groupController.updateGroup);
groupRouter.delete("/:id", authenticate, requireRole(["admin"]), groupController.deleteGroup);

module.exports = groupRouter;
