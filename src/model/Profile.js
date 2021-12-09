const Database = require("../db/config")

module.exports = {

  async get() { // OK
    const db = await Database()

    const profile = await db.get(`SELECT * FROM profile`)

    await db.close()

    return profile
  },

  async add(newProfile) { // OK

    const db = await Database()

    db.exec(`INSERT INTO profile (
          name,
          avatar,
          price_per_hour,
          monthly_budget,
          days_per_week,
          hours_per_day,
          vacation_per_year
      ) VALUES (
          "${newProfile.name}",
          "${newProfile.avatar}",
          ${newProfile.price_per_hour},
          ${newProfile.monthly_budget},
          ${newProfile.days_per_week},
          ${newProfile.hours_per_day},
          ${newProfile.vacation_per_year}
      ) 
    `)

    await db.close()
  },

  async update(newProfile) { // OK
    const db = await Database()

    db.run(`UPDATE profile SET
        name = "${newProfile.name}",
        avatar = "${newProfile.avatar}",
        monthly_budget = ${newProfile.monthly_budget},
        days_per_week = ${newProfile.days_per_week},
        hours_per_day = ${newProfile.hours_per_day},
        vacation_per_year = ${newProfile.vacation_per_year},
        price_per_hour = ${newProfile.price_per_hour}
    `)

    await db.close()
  }

}