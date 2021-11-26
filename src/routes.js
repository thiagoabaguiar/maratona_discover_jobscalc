// constantes
const express = require("express");
const routes = express.Router()
const basePath = __dirname + "/views/"

const Profile = {

    data: {
        name: "Thiago Aguiar",
        avatar: "https://github.com/thiagoabaguiar.png",
        "price-per-hour": 75,
        "monthly-budget": 5000,
        "days-per-week": 5,
        "hours-per-day": 8,
        "vacation-per-year": 4,
    },

    controllers: {

        index(req,res){
            return res.render(basePath + "profile", { profile: Profile })
        },

        update(req,res){
            const data = req.body
            const weeksPerYear = 52
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            const monthlyTotalHours = weeksPerMonth * weekTotalHours
            const valueHour = data["monthly-budget"] / monthlyTotalHours
            Profile.data = {
                ...Profile.data,
                ...req.body,
                "price-per-hour": valueHour,
            }
            console.log(Profile.data)
            return res.redirect('/profile')
        }
    }
}

const Job = {

    data: [
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
    ],

    controllers: {

        index(req,res){
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
                return {
                    ...job, // os ... irá 'espalhar' os atributos do job num novo objeto, sem necessidade de declarar um a um
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["price-per-hour"])
                }
            })
            return res.render(basePath + "index", { jobs: updatedJobs })    
        },

        create(req,res){
            return res.render(basePath + "job")
        },

        show(req,res){
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send("Job não encontrado!")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["price-per-hour"])

            return res.render(basePath + "job-edit", { job })
        },

        save(req,res){
            const lastId = Job.data[Job.data-1]?.id || 0; // trabalhando posição de array
            Job.data.push({ // adiciona no array os valores do req.body, mas tbm poderia ser só jobs.push(job)
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now() // atribui o momento exato em formato timestamp
            }) 
            return res.redirect("/") // para finalizar o fluxo, retorna para o /
        },

        update(req,res){
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send("Job não encontrado!")
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"]
            }
        }
    },

    services: {

        remainingDays(job){
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            const createdDate = new Date(job.createdAt)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
            const timeDiffInMs = dueDateInMs - Date.now()
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.ceil(timeDiffInMs / dayInMs) // arredonda para cima
            return dayDiff
        },

        calculateBudget: (job, pricePerHour) => job["total-hours"] * pricePerHour

    }
    
}


// rotas
routes.get  ("/", Job.controllers.index)
routes.get  ("/profile", Profile.controllers.index)
routes.get  ("/job", Job.controllers.create)
routes.get  ("/job/:id", Job.controllers.show)

routes.post ("/profile", Profile.controllers.update)
routes.post ("/job", Job.controllers.save)
routes.post ("/job/:id", Job.controllers.update)




// export rotas
module.exports = routes;