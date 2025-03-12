const { Router } = require("express");
const questionRoutes = require("./test.routes.js");
const passedRoutes = require("./passed.routes.js")
const testRoutes = require("./test.routes.js");
const adminRoutes = require("./admin.routes.js");
const groupRoutes = require("./group.routes.js");
const themeRoutes = require("./theme.routes.js");
const studentRoutes = require("./student.routes.js");
const teacherRoutes = require("./teacher.routes.js");
const router = Router();

router.use("/tests", testRoutes);
router.use("/admins", adminRoutes);
router.use("/groups", groupRoutes);
router.use("/themes", themeRoutes);
router.use("/students", studentRoutes);
router.use("/tests", questionRoutes);
router.use("/passed", passedRoutes)
router.use("/teachers", teacherRoutes);

module.exports = router;
