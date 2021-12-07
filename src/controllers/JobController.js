const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    view(req, res) {
        return res.render("job");
    },

    async show(req, res) {
        const profile = await Profile.get()
        const jobId = req.params.id;
        const jobs = await Job.get()
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("Job não encontrado!");
        }

        job.budget = JobUtils.calculateBudget(job, profile.price_per_hour);

        return res.render("job-edit", { job });
    },

    async save(req, res) {
        const jobs = await Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0; // trabalhando posição de array
        Job.save({
            // adiciona no array os valores do req.body, mas tbm poderia ser só jobs.push(job)
            id: lastId + 1,
            name: req.body.name,
            "daily_hours": req.body.daily_hours,
            "total_hours": req.body.total_hours,
            created_at: Date.now(), // atribui o momento exato em formato timestamp
        })

        return res.redirect("/"); // para finalizar o fluxo, retorna para o /
    },

    async update(req, res) {
        const jobId = req.params.id;
        const jobs = await Job.get()
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("Job não encontrado!");
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "daily_hours": req.body.daily_hours,
            "total_hours": req.body.total_hours,
        };

        const newJob = jobs.map((job) => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }
            return job;
        });

        await Job.update(newJob)

        // return res.redirect("/job/" + jobId);
        return res.redirect("/")
    },

    delete(req, res) {
        const jobIdToDelete = req.params.id;

        Job.delete(jobIdToDelete)

        return res.redirect("/");
    }
}