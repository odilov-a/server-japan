const { Schema, Types, model } = require("mongoose");
const studentSchema = new Schema(
  {
    group: {
      type: Types.ObjectId,
      ref: "Group",
    },
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
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    admin: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    teacher: {
      type: Types.ObjectId,
      ref: "Teacher",
    },
  },
  {
    versionKey: false,
  }
);

const Student = model("Student", studentSchema);
module.exports = Student;
