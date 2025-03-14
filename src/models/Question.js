const { model, Schema, Types } = require("mongoose");
const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    photoUrl: {
      type: String,
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
