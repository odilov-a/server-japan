const { Schema, Types, model } = require("mongoose");
const themeSchema = new Schema(
  {
    group: [
      {
        type: Types.ObjectId,
        ref: "groups",
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
  },
  {
    versionKey: false,
  }
);

const Theme = model("themes", themeSchema);
module.exports = Theme;
