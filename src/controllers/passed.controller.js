const Passed = require("../models/Passed.js");

exports.getAll = async (req, res) => {
  try {
    const data = await Passed.find();
    return res.json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await Passed.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Result not found" });
    }
    return res.json({ message: "Result deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};