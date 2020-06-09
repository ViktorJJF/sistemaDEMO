const Event = require("../models/Events.js");
const { startOfDay, endOfDay } = require("date-fns");
const list = (req, res) => {
  let { from, to } = req.query;
  let conditions = {};
  if (from) conditions.from = from;
  if (to) conditions.to = to;
  if (!from && !to)
    conditions = {
      createdAt: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    };
  Event.find({})
    .sort({ datetime: "desc" })
    .limit(5)
    .exec((err, payload) => {
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
const create = (req, res) => {
  let body = req.body;
  let event = new Event(body);
  event.save((err, payload) => {
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
      message: "Event creado con éxito",
      payload,
    });
  });
};
const update = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Event.findOneAndUpdate(
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
      res.json({
        ok: true,
        message: "Event actualizado con éxito",
        payload,
      });
    }
  );
};
const deletes = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Event.findByIdAndRemove(id, (err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
        err,
      });
    }
    res.json({
      ok: true,
      message: "Event eliminado con éxito",
      payload,
    });
  });
};

module.exports = {
  list,
  create,
  update,
  deletes,
};
