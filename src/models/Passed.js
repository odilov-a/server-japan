const { Schema, Types, model } = require("mongoose");
const passedSchema = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: "Student",
    },
    admin: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    teacher: {
      type: Types.ObjectId,
      ref: "Teacher",
    },
    test: {
      type: Types.ObjectId,
      ref: "Test",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    answers: [
      {
        question: {
          type: Types.ObjectId,
          ref: "Question",
        },
        selectedAnswer: {
          type: Object,
        },
        correctAnswer: {
          type: Object,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Passed = model("Passed", passedSchema);
module.exports = Passed;