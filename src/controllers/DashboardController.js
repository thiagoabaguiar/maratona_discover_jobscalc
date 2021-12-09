const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    async index(req, res) { // OK

        let profile = await Profile.get() // valida se já existe Profile no banco

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
                        ...job, // os ... irão 'espalhar' os atributos de cada job num novo objeto infoJobs, sem necessidade de declarar um a um
                        remaining,
                        status,
                        budget: job.budget,
                    }
                })

                const freeHours = profile.hours_per_day - hoursJobInProgress

                res.render("index", { jobs: infoJobs, profile, statusCount, freeHours });
        }
        else { // cria um objeto profile vazio para o front carregar e chama a página de profile
            // profile = {
            //     name: "",
            //     avatar: "",
            //     price_per_hour: 0,
            //     monthly_budget: 0,
            //     days_per_week: 0,
            //     hours_per_day: 0,
            //     vacation_per_year: 0
            // }
            res.redirect("/profile"/*, { profile: profile }*/)
        }
    }
}