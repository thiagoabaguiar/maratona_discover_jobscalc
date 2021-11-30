const Job = require("../model/Job")
const Profile = require("../model/Profile")
const jobUtils = require ("../utils/jobUtils")

module.exports = {
    index(req, res) {
        const jobs = Job.get()
        const updatedJobs = jobs.map((job) => {
            const remaining = jobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";
            return {
                ...job, // os ... irá 'espalhar' os atributos do job num novo objeto, sem necessidade de declarar um a um
                remaining,
                status,
                budget: jobUtils.calculateBudget(
                    job,
                    Profile.get()["price-per-hour"]
                ),
            };
        });
        return res.render("index", { jobs: updatedJobs });
    },

    create(req, res) {
        return res.render("job");
    },

    show(req, res) {
        const jobId = req.params.id;
        const jobs = Job.get()
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("Job não encontrado!");
        }

        job.budget = jobUtils.calculateBudget(
            job,
            Profile.update()["price-per-hour"]
        );

        return res.render("job-edit", { job });
    },

    save(req, res) {
        const jobs = Job.get()
        const lastId = jobs[jobs - 1]?.id || 0; // trabalhando posição de array
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

        jobs = jobs.map((job) => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }

            return job;
        });

        return res.redirect("/job/" + jobId);
    },

    delete(req, res) {
        const jobId = req.params.id;
        const jobs = Job.get()

        jobs = jobs.filter((job) => Number(job.id) !== Number(jobId));

        return res.redirect("/");
    }
}