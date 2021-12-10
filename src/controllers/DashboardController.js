const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {

    async index(req, res) { // OK

        let profile = await Profile.get()

        if (profile != undefined) {

            const allJobs = await Job.getAll()

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
                    ...job,
                    remaining,
                    status,
                    budget: job.budget,
                }
            })

            const freeHours = profile.hours_per_day - hoursJobInProgress

            res.render("index", { jobs: infoJobs, profile, statusCount, freeHours })
        }
        else {

            res.redirect("/profile")

        }
    }
}