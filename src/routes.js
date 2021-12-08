// constantes
const express = require("express");
const routes = express.Router();

const DashboardController = require("./controllers/DashboardController")
const JobController = require("./controllers/JobController")
const ProfileController = require("./controllers/ProfileController");

// rotas
routes.get("/", DashboardController.index);
routes.get("/profile", ProfileController.index);
routes.get("/job", JobController.index);
routes.get("/job/:id", JobController.show);

routes.post("/profile", ProfileController.update);
routes.post("/job", JobController.add);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);

// export rotas
module.exports = routes;