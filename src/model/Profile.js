const Database = require("../db/config")

module.exports = {

  async get() {
    const db = await Database()

    const profile = await db.get(`SELECT * FROM profile`)

    await db.close()

    return profile
  },

  async update(newData) {
    const db = await Database()

    db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData.monthly_budget},
        days_per_week = ${newData.days_per_week},
        hours_per_day = ${newData.hours_per_day},
        vacation_per_year = ${newData.vacation_per_year},
        price_per_hour = ${newData.price_per_hour}
    `)

    await db.close()
  }
}