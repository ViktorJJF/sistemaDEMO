const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let validRoles = {
  values: ["ADMIN", "SUPERADMIN", "USER"],
  message: "{VALUE} no es un rol válido",
};

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
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
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
    dni: {
      type: String,
      unique: true,
      required: [true, "El dni es necesario!"],
    },
    role: {
      type: String,
      default: "USER",
      enum: validRoles,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Members", memberSchema);
