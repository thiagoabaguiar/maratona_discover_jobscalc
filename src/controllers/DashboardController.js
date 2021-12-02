const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    index(req, res) {
        const jobs = Job.get()
        const profile = Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        let hoursJobInProgress = 0
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";
            statusCount[status] += 1

            hoursJobInProgress = (status === "progress") ? hoursJobInProgress + Number(job["daily-hours"]) : hoursJobInProgress

            // if (status === "progress") {
            //     hoursJobInProgress = hoursJobInProgress + Number(job["daily-hours"])
            //     console.log(job["daily-hours"])
            // }

            return {
                ...job, // os ... irá 'espalhar' os atributos do job num novo objeto, sem necessidade de declarar um a um
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["price-per-hour"]),
            };
        });

        const freeHours = profile["hours-per-day"] - hoursJobInProgress

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
    }
}