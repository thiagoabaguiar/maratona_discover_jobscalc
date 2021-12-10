const Database = require("./config")

const initDb = {

    async init() {

        const db = await Database()

        await db.exec(
            `CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                price_per_hour INT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT
            )`
        );

        await db.exec(
            `CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                budget INT,
                created_at DATETIME
            )`
        );

        await db.close()
    }
    
}

//////////////////////////////////////////////////////////////////

initDb.init()