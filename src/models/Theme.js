const { Schema, Types, model } = require("mongoose");
const themeSchema = new Schema(
  {
    group: [
      {
        type: Types.ObjectId,
        ref: "Group",
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
    admin: {
      type: Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    teacher: {
      type: Types.ObjectId,
      ref: "Teacher",
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

const Theme = model("Theme", themeSchema);
module.exports = Theme;
