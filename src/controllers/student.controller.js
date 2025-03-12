const bcrypt = require("bcrypt");
const { sign } = require("../utils/jwt.js");
const Student = require("../models/Student.js");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select(
        "firstName lastName phoneNumber photoUrl username lastLogin group"
      )
      .populate("group");
    return res.json({ data: students });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMeStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).populate("group");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.isActive === false) {
      return res.status(401).json({ message: "Account is not active" });
    }
    student.lastLogin = new Date();
    await student.save();
    return res.status(200).json({
      data: {
        username: student.username,
        firstName: student.firstName,
        lastName: student.lastName,
        phoneNumber: student.phoneNumber,
        photoUrl: student.photoUrl,
        isActive: student.isActive,
        group: student.group,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ data: student });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.searchStudentByFirstNameLastName = async (req, res) => {
  try {
    const students = await Student.find({
      $or: [
        { firstName: { $regex: req.query.search, $options: "i" } },
        { lastName: { $regex: req.query.search, $options: "i" } },
      ],
    }).select("firstName lastName username isActive lastLogin photoUrl");
    return res.json({ data: students });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const student = new Student({
      ...otherData,
      password: hashedPassword,
    });
    await student.save();
    const token = sign({
      id: student._id,
      role: student.role,
      username: student.username,
      createdAt: student.createdAt,
    });
    return res.status(201).json({
      data: {
        token,
        student,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.adminRegisterStudent = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const existingStudent = await Student.findOne({ username });
    if (existingStudent) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const student = new Student({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });
    await student.save();
    return res.status(201).json({ data: student });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { username, password } = req.body;
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.isActive === false) {
      return res.status(401).json({ message: "Account is not active" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, student.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    student.lastLogin = new Date();
    await student.save();
    const token = sign({
      id: student._id,
      role: student.role,
      username: student.username,
      createdAt: student.createdAt,
    });
    return res.status(200).json({
      data: {
        token,
        role: student.role,
        username: student.username,
        isActive: student.isActive,
        lastLogin: student.lastLogin,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.meUpdateStudent = async (req, res) => {
  try {
    const { userId } = req;
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const student = await Student.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -role -createdAt -_id -lastLogin");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ data: student });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const student = await Student.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ data: student });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ data: student });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
