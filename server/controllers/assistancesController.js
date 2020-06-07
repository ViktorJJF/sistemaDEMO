const Assistance = require("../models/Assistances.js");
const Event = require("../models/Events.js");
const list = (req, res) => {
  let query = req.query;
  let conditions = {};
  if (query.memberId) conditions.memberId = query.memberId;
  Assistance.find(conditions)
    .sort({ createdAt: "desc" })
    .limit(8)
    .populate("eventId")
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
const create = async (req, res) => {
  let body = req.body;
  //getting event by id
  let event = await Event.findOne({ _id: body.eventId });
  console.log("inicio: ", event.datetime);
  console.log("tolerancia: ", event.tolerance);
  //set assistance state
  let date = new Date(event.datetime);
  let begin = date.getTime();
  let endTolerance = date.getTime() + event.tolerance;
  let currentDate = new Date().getTime();
  if (currentDate > begin && currentDate < endTolerance) body.state = "A";
  if (currentDate > endTolerance) body.state = "T";
  //saving
  let assistance = new Assistance(body);
  assistance.save((err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
      });
    }
    //setting event
    payload.eventId = event;
    res.json({
      ok: true,
      message: "Asistencia marcada con éxito",
      payload,
    });
  });
};
const update = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Assistance.findOneAndUpdate(
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
        message: "Assistance actualizado con éxito",
        payload,
      });
    }
  );
};
const deletes = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Assistance.findByIdAndRemove(id, (err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
        err,
      });
    }
    res.json({
      ok: true,
      message: "Assistance eliminado con éxito",
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
