const Member = require("../models/Members.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const list = (req, res) => {
  Member.find().exec((err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      payload,
    });
  });
};
const create = async (req, res) => {
  let body = req.body;
  //default password on create
  body.password = await bcrypt.hash(body.dni, parseInt(process.env.SALTROUNDS));
  let member = new Member(body);
  member.save((err, payload) => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(400).json({
          ok: false,
          message: "El correo ya estaba registrado",
          err,
        });
      }
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
        err,
      });
    }
    res.json({
      ok: true,
      message: "Member creado con éxito",
      payload,
    });
  });
};
const update = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Member.findOneAndUpdate(
    { _id: id },
    body,
    {
      new: true,
      runValidators: true,
    },
    (err, payload) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res.status(400).json({
            ok: false,
            message: "El chatbot ya estaba registrado",
            err,
          });
        }
        return res.status(400).json({
          ok: false,
          message: "Algo salió mal",
          err,
        });
      }
      //updating session
      req.session.passport.user = payload;
      res.json({
        ok: true,
        message: "Member actualizado con éxito",
        payload,
      });
    }
  );
};
const deletes = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Member.findByIdAndRemove(id, (err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
        err,
      });
    }
    res.json({
      ok: true,
      message: "Member eliminado con éxito",
      payload,
    });
  });
};

const getUser = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("el usuario esta autenticado");
    return res.json({
      ok: true,
      payload: req.user,
    });
  }
  return res.json({
    ok: false,
    err: {
      message: "Usuario no logeado",
    },
  });
};

const logout = (req, res) => {
  req.logout();
  res.json({
    ok: true,
  });
};

const updatePassword = async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let newPassword = await bcrypt.hash(
    body.newPassword,
    parseInt(process.env.SALTROUNDS)
  );
  Member.findOneAndUpdate(
    { _id: id },
    { password: newPassword },
    {
      new: true,
      runValidators: true,
    },
    (err) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "Algo salió mal",
          err,
        });
      }
      res.json({
        ok: true,
        message: "Contraseña actualizada con éxito",
      });
    }
  );
};

const login = (req, res) => {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  Member.findOne(
    {
      email,
    },
    (err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "Algo salió mal",
          err,
        });
      }
      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El usuario con ese correo no existe",
          },
        });
      }
      let passwordIsValid = bcrypt.compareSync(password, userDB.password);
      if (!passwordIsValid) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Contraseña incorrecta",
          },
        });
      }
      let token = jwt.sign(
        {
          usuario: userDB,
        },
        process.env.SEED,
        {
          expiresIn: parseInt(process.env.EXPIRESIN),
        }
      );
      console.log("antes del inicio: ", userDB._id);
      req.login(userDB, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("inicio de sesion exitoso");
      });
      res.json({
        ok: true,
        message: "Bienvenido",
        user: userDB,
        token,
      });
    }
  );
};

module.exports = {
  list,
  create,
  update,
  deletes,
  getUser,
  login,
  logout,
  updatePassword,
};
