const { Schema, model } = require("mongoose");
const teacherSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    photoUrl: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
      default: "teacher",
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

const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;