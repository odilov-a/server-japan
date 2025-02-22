const { Schema, model } = require("mongoose");
const testSchema = new Schema(
  {
    question: {
      type: String,
    },
    level: {
      type: Number,
      required: true,
    },
    photoUrl: [
      {
        type: String,
      },
    ],
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
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

const Test = model("tests", testSchema);
module.exports = Test;
