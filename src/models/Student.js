const { Schema, model } = require("mongoose");
const studentSchema = new Schema(
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
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
    },
    photoUrl: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
      default: "student",
      required: true,
    },
    lastLogin: {
      type: Date,
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

const Student = model("students", studentSchema);
module.exports = Student;
