const Profile = require("../model/Profile")

module.exports = {
  index(req, res) {
    const profile = Profile.get()
    return res.render("profile", { profile: profile });
  },

  update(req, res) {
    const data = req.body;
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    const monthlyTotalHours = weeksPerMonth * weekTotalHours;
    const valueHour = data["monthly-budget"] / monthlyTotalHours;
    Profile.update({
      ...Profile.get(),
      ...req.body,
      "price-per-hour": valueHour,
    })
    return res.redirect("/profile");
  },
};
