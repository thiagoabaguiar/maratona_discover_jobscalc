const Database = require("./config")

const initDb = {

    async init() {

        const db = await Database() // para abrir o banco

        await db.exec( // cria a table profile
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

        await db.exec( // cria a table jobs
            `CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                budget INT,
                created_at DATETIME
            )`
        );

        // await db.run(
        //     `INSERT INTO profile (
        //         name,
        //         avatar,
        //         price_per_hour,
        //         monthly_budget,
        //         days_per_week,
        //         hours_per_day,
        //         vacation_per_year
        //     ) VALUES (
        //         "Thiago Aguiar",
        //         "https://github.com/thiagoabaguiar.png",
        //         75,
        //         5000,
        //         5,
        //         8,
        //         4
        //     )`
        // );

        // await db.run(
        //     `INSERT INTO jobs (
        //         name,
        //         daily_hours,
        //         total_hours,
        //         budget,
        //         created_at
        //     ) VALUES (
        //         "Pizzaria Guloso",
        //         10,
        //         10,
        //         5000,
        //         1638478485000
        //     )`
        // );

        // await db.run(
        //     `INSERT INTO jobs (
        //         name,
        //         daily_hours,
        //         total_hours,
        //         budget,
        //         created_at
        //     ) VALUES (
        //         "OneTwo Project",
        //         4,
        //         20,
        //         4000,
        //         1638458285000
        //     )`
        // );

        await db.close() // para fechar o banco
    }
}

//////////////////////////////////////////////////////////////////

initDb.init()