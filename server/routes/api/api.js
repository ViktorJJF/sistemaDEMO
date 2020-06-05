const express = require("express");
const router = express.Router();

//Controllers
const membersController = require("../../controllers/membersController");
const assistancesController = require("../../controllers/assistancesController.js");
const eventsController = require("../../controllers/eventsController.js");
const usersController = require("../../controllers/usersController.js");

//tools
const dateTools = require("../../tools/dateTools.js");

//sessions
router.get("/session", (req, res) => {
  console.log("sesion: ", req.cookies);
  console.log("sesion usuario: ", req.user);
  console.log("sesion: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      activeSession: req.user,
    });
  }
  return res.json({
    isAuthenticated: false,
  });
});
router.get("/session/list", (req, res) => {
  console.log("sesiones activas: ", req.sessionStore);
  return res.json({
    sesions: req.session,
  });
});

//CRUD events
router.get("/events", eventsController.list);
router.post("/events", eventsController.create);
router.put("/events/:id", eventsController.update);
router.delete("/events/:id", eventsController.deletes);

//CRUD assistances
router.get("/assistances", assistancesController.list);
router.post("/assistances", assistancesController.create);
router.put("/assistances/:id", assistancesController.update);
router.delete("/assistances/:id", assistancesController.deletes);

//CRUD members
router.get("/members", membersController.list);
router.post("/members", membersController.create);
router.put("/members/:id", membersController.update);
router.delete("/members/:id", membersController.deletes);
//CRUD USERS
router.post("/login", membersController.login);
router.post("/users/logged", membersController.getUser);
router.get("/logout", membersController.logout);
module.exports = router;
