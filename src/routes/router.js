const { Router } = require("express");
const testRoutes = require("./test.routes.js");
const adminRoutes = require("./admin.routes.js");
const groupRoutes = require("./group.routes.js");
const themeRoutes = require("./theme.routes.js");
const passedRoutes = require("./passed.routes.js");``
const questionRoutes = require("./test.routes.js");
const studentRoutes = require("./student.routes.js");
const teacherRoutes = require("./teacher.routes.js");
const homeworkRoutes = require("./homework.routes.js");
const router = Router();


router.use("/tests", testRoutes);
router.use("/admins", adminRoutes);
router.use("/groups", groupRoutes);
router.use("/themes", themeRoutes);
router.use("/passed", passedRoutes);
router.use("/tests", questionRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);
router.use("/homeworks", homeworkRoutes);

module.exports = router;
