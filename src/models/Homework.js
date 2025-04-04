const { Schema, Types, model } = require("mongoose");
const homeworkSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    student: [
      {
        type: Types.ObjectId,
        ref: "Student",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Homework = model("Homework", homeworkSchema);
module.exports = Homework;
