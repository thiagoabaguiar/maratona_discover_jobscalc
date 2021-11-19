const express = require("express");
const routes = express.Router()
const basePath = __dirname + "/views/"
const Profile = {
    name: "Thiago Aguiar",
    avatar: "https://github.com/thiagoabaguiar.png",
    "price-per-hour": 75,
    "monthly-budget": 5000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4
}

routes.get("/", (req, res) => res.render(basePath + "index"))
routes.get("/job", (req, res) => res.render(basePath + "job"))
routes.get("/job/edit", (req, res) => res.render(basePath + "job-edit"))
routes.get("/profile", (req, res) => res.render(basePath + "profile", { Profile }))
routes.get("/index", (req, res) => res.redirect("/"))
routes.get("/index.html", (req, res) => res.redirect("/"))

module.exports = routes;