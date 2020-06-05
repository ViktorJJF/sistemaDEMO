const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let memberSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "El nombre del miembro es requerido"],
    },
    last_name: {
      type: String,
      required: [true, "El nombre del miembro es requerido"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El correo es necesario!"],
    },
    profile_picture: String,
    cell_number: String,
    phone_number: String,
    address: String,
    country: String,
    city: String,
    rank: {
      type: String,
      enum: {
        values: ["APRENDIZ", "COMPAÑERO", "MAESTRO"],
        message: "{VALUE} no es un rol válido",
      },
    },
    dni: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Members", memberSchema);
