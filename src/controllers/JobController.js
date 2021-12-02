const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    view(req, res) {
        return res.render("job");
    },

    show(req, res) {
        const profile = Profile.get()
        const jobId = req.params.id;
        const jobs = Job.get()
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("Job não encontrado!");
        }

        job.budget = JobUtils.calculateBudget(job, profile["price-per-hour"]);

        return res.render("job-edit", { job });
    },

    save(req, res) {
        const jobs = Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0; // trabalhando posição de array
        jobs.push({
            // adiciona no array os valores do req.body, mas tbm poderia ser só jobs.push(job)
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            createdAt: Date.now(), // atribui o momento exato em formato timestamp
        });

        return res.redirect("/"); // para finalizar o fluxo, retorna para o /
    },

    update(req, res) {
        const jobId = req.params.id;
        const jobs = Job.get()
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("Job não encontrado!");
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
        };

        const newJob = jobs.map((job) => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }
            return job;
        });

        Job.update(newJob)

        // return res.redirect("/job/" + jobId);
        return res.redirect("/")
    },

    delete(req, res) {
        const jobId = req.params.id;

        Job.delete(jobId)

        return res.redirect("/");
    }
}