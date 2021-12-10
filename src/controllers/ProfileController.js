const Profile = require("../model/Profile")
const ProfileUtils = require("../utils/ProfileUtils")

module.exports = {

    async index(req, res) { // OK

      let profile = await Profile.get()
      if (profile === undefined) {

          profile = {
            name: "",
            avatar: "",
            price_per_hour: 0,
            monthly_budget: 0,
            days_per_week: 0,
            hours_per_day: 0,
            vacation_per_year: 0
          }

          res.render("profile", { profile: profile })

      }
      else {

        return res.render("profile", { profile: profile })

      }
    },

    async add(req, res) { // OK

        const profileDB = await Profile.get()
        if (profileDB === undefined) {

            const price_per_hour = ProfileUtils.calcPricePerHour(
              Number(req.body.vacation_per_year),
              Number(req.body.hours_per_day),
              Number(req.body.days_per_week),
              Number(req.body.monthly_budget)
            )

            const newProfile = {
              name: req.body.name,
              avatar: req.body.avatar,
              price_per_hour: price_per_hour,
              monthly_budget: Number(req.body.monthly_budget),
              hours_per_day: Number(req.body.hours_per_day),
              days_per_week: Number(req.body.days_per_week),
              vacation_per_year: Number(req.body.vacation_per_year)
            }

            await Profile.add(newProfile)

            res.redirect("/")

        }
        else {

            const price_per_hour = ProfileUtils.calcPricePerHour(
              Number(req.body.vacation_per_year),
              Number(req.body.hours_per_day),
              Number(req.body.days_per_week),
              Number(req.body.monthly_budget)
            )

            const newProfile = {
              name: req.body.name,
              avatar: req.body.avatar,
              price_per_hour: price_per_hour,
              monthly_budget: Number(req.body.monthly_budget),
              hours_per_day: Number(req.body.hours_per_day),
              days_per_week: Number(req.body.days_per_week),
              vacation_per_year: Number(req.body.vacation_per_year)
            }

            if (
              profileDB.name != newProfile.name ||
              profileDB.avatar != newProfile.avatar ||
              profileDB.monthly_budget != newProfile.monthly_budget ||
              profileDB.hours_per_day != newProfile.hours_per_day ||
              profileDB.days_per_week != newProfile.days_per_week ||
              profileDB.vacation_per_year != newProfile.vacation_per_year
            ) {

              await Profile.update(newProfile)

            }

            res.redirect("/")

        }
    }

};
