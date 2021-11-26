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
        "value-hour": 75
    },

    controllers: {
        index(req,res){
            return res.render(basePath + "profile", { profile: Profile })
        },

        update(){
            return
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
                    budget: Profile.data["value-hour"] * job["total-hours"]
                        }
            })
            
            return res.render(basePath + "index", { jobs: updatedJobs })    
        },

        create(req,res){
            return res.render(basePath + "job")
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
        
        edit(req,res){
            return res.render(basePath + "job-edit")
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
        }
    }
    
}


// rotas
routes.get("/", Job.controllers.index)
routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)
routes.get("/job/edit", Job.controllers.edit)
routes.get("/profile", Profile.controllers.index)


// export rotas
module.exports = routes;