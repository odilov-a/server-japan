exports.requireRole = (roles) => (req, res, next) => {
  const userRole = req.admin?.role || req.student?.role;
  if (!roles.includes(userRole)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
