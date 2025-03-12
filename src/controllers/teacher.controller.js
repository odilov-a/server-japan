const bcrypt = require("bcrypt");
const Teacher = require("../models/Teacher.js");
const { sign } = require("../utils/jwt.js");

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password -createdAt");
    return res.json({ data: teachers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMeTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ data: teacher });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ data: teacher });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.registerTeacher = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const teacher = new Teacher({
      ...otherData,
      password: hashedPassword,
    });
    await teacher.save();
    const token = sign({
      id: teacher._id,
      role: teacher.role,
      username: teacher.username,
      createdAt: teacher.createdAt,
    });
    return res.status(201).json({
      data: {
        token,
        teacher,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginTeacher = async (req, res) => {
  try {
    const { username, password } = req.body;
    const teacher = await Teacher.findOne({ username });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, teacher.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = sign({
      id: teacher._id,
      role: teacher.role,
      username: teacher.username,
      createdAt: teacher.createdAt,
    });
    return res.status(200).json({
      data: {
        token,
        role: teacher.role,
        username: teacher.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.meUpdateTeacher = async (req, res) => {
  try {
    const { userId } = req;
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const teacher = await Teacher.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -role -createdAt -_id");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ data: teacher });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ data: teacher });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ data: teacher });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
