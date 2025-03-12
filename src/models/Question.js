const { model, Schema, Types } = require("mongoose");
const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
    },
    photoUrl: [
      {
        type: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    answers: [
      {
        answer: String,
        isCorrect: {
          type: Boolean,
        },
      },
    ],
    test: {
      type: Types.ObjectId,
      ref: "Test",
    },
  },
  {
    versionKey: false,
  }
);

const Question = model("Question", questionSchema);
module.exports = Question;