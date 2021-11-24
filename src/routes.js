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
const jobs = [

    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 8,
        "total-hours": 45,
        createdAt: Date.now()
    },

    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 5,
        "total-hours": 35,
        createdAt: Date.now()
    }

]





routes.get("/", (req, res) => {
    
    const updatedJobs = jobs.map((job) => {
        
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        const createdDate = new Date(job.createdAt)
        const dueDay = createdDate.getDate() + Number(remainingDays)

        return job
    })
    





    return res.render(basePath + "index", { jobs })    
    })








routes.get("/job", (req, res) => res.render(basePath + "job"))
routes.post("/job", (req, res) => {
    
    const lastId = jobs[jobs.length-1]?.id || 0; // trabalhando posição de array

    jobs.push({ // adiciona no array os valores do req.body, mas tbm poderia ser só jobs.push(job)
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt: Date.now() // atribui o momento exato em formato timestamp
    }) 

    return res.redirect("/") // para finalizar o fluxo, retorna para o /
})
routes.get("/job/edit", (req, res) => res.render(basePath + "job-edit"))
routes.get("/profile", (req, res) => res.render(basePath + "profile", { Profile }))
routes.get("/index", (req, res) => res.redirect("/"))
routes.get("/index.html", (req, res) => res.redirect("/"))

module.exports = routes;