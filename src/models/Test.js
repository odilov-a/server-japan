const { Schema, Types, model } = require("mongoose");
const testSchema = new Schema(
  {
    name: {
      type: String,
    },
    subject: {
      type: String,
    },
    teacher: {
      type: Types.ObjectId,
      ref: "Teacher",
    },
    admin: {
      type: Types.ObjectId,
      ref: "Admin",
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

const Test = model("Test", testSchema);
module.exports = Test;
