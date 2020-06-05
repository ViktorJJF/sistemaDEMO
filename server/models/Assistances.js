const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let assistanceSchema = new Schema(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Members",
      required: [true, "El id del miembro es requerido"],
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Events",
      required: [true, "El id del evento es requerido"],
    },
    state: {
      type: String,
      enum: {
        values: ["A", "T", "F"],
        message: "{VALUE} no es un estado de asistencia válido",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assistances", assistanceSchema);
