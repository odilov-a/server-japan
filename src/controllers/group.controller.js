const Group = require("../models/Group.js");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    return res.json({ data: groups });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.json({ data: group });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    return res.status(201).json({ data: group });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.json({ data: group });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.json({ message: "Group deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
