// constantes
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
    "vacation-per-year": 4,
    "value-hour": 75
}
const jobs = [

    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 10,
        "total-hours": 10,
        createdAt: Date.now()
    },

    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 4,
        "total-hours": 20,
        createdAt: Date.now()
    }

]


// funções
function remainingDays(job){
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    const createdDate = new Date(job.createdAt)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)
    const timeDiffInMs = dueDateInMs - Date.now()
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs) // arredonda para cima
    return dayDiff
}


// rotas
routes.get("/", (req, res) => {
    
    const updatedJobs = jobs.map((job) => {
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        return {
            ...job, // os ... irá 'espalhar' os atributos do job num novo objeto, sem necessidade de declarar um a um
            remaining,
            status,
            budget: Profile["value-hour"] * job["total-hours"]
        }
    })

    return res.render(basePath + "index", { jobs: updatedJobs })    
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


// export rotas
module.exports = routes;