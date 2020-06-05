const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let eventSchema = new Schema(
  {
    title: {
      type: String,
      default: `Reunión`,
    },
    datetime: {
      type: Date,
      default: new Date(),
    },
    tolerance: {
      type: Number,
      default: 15 * 60 * 1000,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", eventSchema);
