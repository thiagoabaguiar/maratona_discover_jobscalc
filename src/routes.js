// constantes
const express = require("express");
const routes = express.Router();

const JobController = require("./controllers/JobController")
const ProfileController = require("./controllers/ProfileController");

// rotas
routes.get("/", JobController.index);
routes.get("/profile", ProfileController.index);
routes.get("/job", JobController.view);
routes.get("/job/:id", JobController.show);

routes.post("/profile", ProfileController.update);
routes.post("/job", JobController.save);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);

// export rotas
module.exports = routes;