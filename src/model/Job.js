const Database = require("../db/config")

// let data = [];

module.exports = {
    async getAll() { // OK
        const db = await Database()

        const allJobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return allJobs
    },

    async getOnce(jobIdToGet){
        const db = await Database()

        const jobGot = await db.run(`
            SELECT * FROM jobs
            WHERE id = ${jobIdToGet}        
        `)

        await db.close()

        return jobGot
    },

    async add(newJob) { // OK
        const db = await Database()

        db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                budget,
                created_at 
            ) VALUES (
                "${newJob.name}",
                ${newJob.daily_hours},
                ${newJob.total_hours},
                ${newJob.budget},
                ${newJob.created_at} 
            )
        `)

        await db.close()
    },

    async update(jobIdToUpdate,jobToUpdate) { // OK
        const db = await Database()
        
        db.run(`
            UPDATE jobs SET
                name = "${jobToUpdate.name}",
                daily_hours = ${jobToUpdate.daily_hours},
                total_hours = ${jobToUpdate.total_hours}
            WHERE id = ${jobIdToUpdate}
        `)

        await db.close()
    },

    async delete(jobIdToDelete) { // OK
        const db = await Database()
        
        db.run(`
            DELETE FROM jobs
            WHERE id = "${jobIdToDelete}"
        `)

        await db.close()
    }
}