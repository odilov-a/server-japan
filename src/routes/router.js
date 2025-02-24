const { Router } = require("express");
const testRoutes = require("./test.routes.js");
const adminRoutes = require("./admin.routes.js");
const groupRoutes = require("./group.routes.js");
const themeRoutes = require("./theme.routes.js");
const studentRoutes = require("./student.routes.js");
const router = Router();

router.use("/tests", testRoutes);
router.use("/admins", adminRoutes);
router.use("/groups", groupRoutes);
router.use("/themes", themeRoutes);
router.use("/students", studentRoutes);

module.exports = router;
