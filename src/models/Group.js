const { Schema, model } = require("mongoose");
const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Group = model("groups", groupSchema);
module.exports = Group;
