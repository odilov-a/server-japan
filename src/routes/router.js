const { Router } = require("express");
const testRoutes = require("./test.routes.js");
const adminRoutes = require("./admin.routes.js");
const themeRoutes = require("./theme.routes.js");
const studentRoutes = require("./student.routes.js");
const router = Router();

router.use("/tests", testRoutes);
router.use("/admins", adminRoutes);
router.use("/themes", themeRoutes);
router.use("/students", studentRoutes);

module.exports = router;
