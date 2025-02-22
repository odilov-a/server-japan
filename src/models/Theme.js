const { Schema, model } = require("mongoose");
const themeSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
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
