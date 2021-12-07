const Database = require("../db/config")

// let data = [];

module.exports = {
    async get() {
        const db = await Database()

        const data = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return data
    },

    save(newJob) {
        data.push(newJob)
    },

    async update(newJob) {
        const db = await Database()

        db.run(`
            UPDATE jobs SET
                name = "${newJob.name}",
                daily_hours = ${newJob.daily_hours},
                total_hours = ${newJob.total_hours},
                budget = ${newJob.budget},
                created_at = ${newJob.created_at}
        `)

        await db.close()
    },

    async delete(jobIdToDelete) {
        const db = await Database()
        
        const allJobs = await db.all(`SELECT * FROM jobs`)

        const jobToDelete = allJobs.find((allJobs) => Number(jobIdToDelete) === Number(allJobs.id));

        db.run(`
            DELETE FROM jobs
            WHERE id = "${jobToDelete.id}"
        `)

        await db.close()
    }
}