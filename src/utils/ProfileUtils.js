module.exports = {

    calcPricePerHour(vacation_per_year, hours_per_day, days_per_week, monthly_budget) {

        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear - vacation_per_year) / 12
        const weekTotalHours = hours_per_day * days_per_week
        const monthlyTotalHours = weeksPerMonth * weekTotalHours
        const valueHour = monthly_budget / monthlyTotalHours

        return price_per_hour = valueHour
    }

}