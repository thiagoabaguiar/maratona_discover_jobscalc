const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    index(req, res) { // OK
        return res.render("job");
    },

    async show(req, res) {

        const jobIdToGet = req.params.id;
        const jobGot = await Job.getOnce(jobIdToGet)

        const profile = await Profile.get()
        
        

        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("Job não encontrado!");
        }

        job.budget = JobUtils.calculateBudget(job, profile.price_per_hour);

        return res.render("job-edit", { job: jobGot });
    },

    async add(req, res) { // OK
        
        const newJobFromFront = req.body
        const profile = await Profile.get()

        const newJob = {
            name: newJobFromFront.name,
            daily_hours: Number(newJobFromFront.daily_hours),
            total_hours: Number(newJobFromFront.total_hours),
            budget: profile.price_per_hour * Number(newJobFromFront.total_hours),
            created_at: Date.now()
        }
        
        Job.add(newJob)        
        
        // const jobs = await Job.get()
        // const lastId = jobs[jobs.length - 1]?.id || 0; // trabalhando posição de array
        // Job.add({
        //     // adiciona no array os valores do req.body, mas tbm poderia ser só jobs.push(job)
        //     id: lastId + 1,
        //     name: req.body.name,
        //     "daily_hours": req.body.daily_hours,
        //     "total_hours": req.body.total_hours,
        //     created_at: Date.now(), // atribui o momento exato em formato timestamp
        // })

        return res.redirect("/"); // para finalizar o fluxo, retorna para o /
    },

    async update(req, res) { // OK

        const jobIdToUpdate = req.params.id; // guarda o ID que veio do front
        const jobToUpdate = req.body; // guarda os demais campos que vieram do front

        await Job.update(jobIdToUpdate,jobToUpdate)

        return res.redirect("/")

        // const allJobs = await Job.get()
        // const job = allJobs.find((allJobs) => Number(job.id) === Number(jobId));

        // if (!job) {
        //     return res.send("Job não encontrado!");
        // }

        // const updatedJob = {
        //     ...job,
        //     name: req.body.name,
        //     "daily_hours": req.body.daily_hours,
        //     "total_hours": req.body.total_hours,
        // };

        // const newJob = jobs.map((job) => {
        //     if (Number(job.id) === Number(jobId)) {
        //         job = updatedJob;
        //     }
        //     return job;
        // });

        // // return res.redirect("/job/" + jobId);
        
    },

    delete(req, res) { // OK
        const jobIdToDelete = req.params.id;

        Job.delete(jobIdToDelete)

        return res.redirect("/");
    }
}