const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    async index(req, res) { // OK
        const allJobs = await Job.getAll()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: allJobs.length
        }

        let hoursJobInProgress = 0
        const infoJobs = allJobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";
            statusCount[status] += 1
            hoursJobInProgress = (status === "progress") ? hoursJobInProgress + Number(job.daily_hours) : hoursJobInProgress

            return {
                ...job, // os ... irão 'espalhar' os atributos de cada job num novo objeto, sem necessidade de declarar um a um
                remaining,
                status,
                budget: job.budget,
            }
        })

        const freeHours = profile.hours_per_day - hoursJobInProgress

        return res.render("index", { jobs: infoJobs, profile , statusCount, freeHours });
    }
}