const Homework = require("../models/Homework.js");

exports.createHomework = async (req, res) => {
  try {
    const homework = new Homework(req.body);
    await homework.save();
    return res.status(201).json({ data: homework });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateHomework = async (req, res) => {
  try {
    const homework = await Homework.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!homework) {
      return res.status(404).json({ message: "Homework not found" });
    }
    return res.json({ data: homework });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};