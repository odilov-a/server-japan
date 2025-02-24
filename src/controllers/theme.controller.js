const Theme = require("../models/Theme.js");

exports.getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    return res.status(200).json({ data: themes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }
    return res.status(200).json({ data: theme });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createTheme = async (req, res) => {
  try {
    const theme = new Theme(req.body);
    await theme.save();
    return res.status(201).json({ data: theme });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }
    return res.status(200).json({ data: theme });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);
    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }
    return res.status(200).json({ message: "Theme has been deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
