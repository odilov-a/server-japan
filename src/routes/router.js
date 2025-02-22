const { Router } = require("express");
const adminRoutes = require("./admin.routes.js");
const studentRoutes = require("./student.routes.js");
const router = Router();

router.use("/admins", adminRoutes);
router.use("/students", studentRoutes);

module.exports = router;
