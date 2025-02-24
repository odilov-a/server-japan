const Test = require("../models/Test.js");

exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    return res.status(200).json({ data: tests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    return res.status(200).json({ data: test });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);
    return res.status(201).json({ data: test });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    return res.status(200).json({ data: test });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    return res.status(204).json({ message: "Test has been deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
