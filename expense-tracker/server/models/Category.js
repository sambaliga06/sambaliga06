const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

categorySchema.pre("save", function () {
  if (this.name) {
    this.name = this.name
      .trim()
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      ).join(" ");
  }
});

module.exports = mongoose.model(
  "Category",
  categorySchema
);