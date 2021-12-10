const { getOnce } = require("../model/Job");
const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {

    index(req, res) { // OK

        return res.render("job")

    },

    async show(req, res) { // OK

        const jobIdToGet = req.params.id
        const allJobs = await Job.getAll()
        const jobGot = await Job.getOnce(jobIdToGet)

        const job = allJobs.find((job) => Number(job.id) === Number(jobIdToGet));
        if (!job) {
            return res.send("Job não encontrado!");
        }

        return res.render("job-edit", { job: jobGot })
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

        return res.redirect("/")
    },

    async update(req, res) { // OK

        const profile = await Profile.get()
        
        const jobToUpdate = {
            id: req.params.id,
            name: req.body.name,
            daily_hours: Number(req.body.daily_hours),
            total_hours: Number(req.body.total_hours),
            budget: profile.price_per_hour * Number(req.body.total_hours),
        }

        await Job.update(jobToUpdate)

        return res.redirect("/")
    },

    delete(req, res) { // OK

        const jobIdToDelete = req.params.id

        Job.delete(jobIdToDelete)

        return res.redirect("/")

    }
    
}