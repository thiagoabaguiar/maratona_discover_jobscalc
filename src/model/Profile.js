let data = {
  name: "Thiago Aguiar",
  avatar: "https://github.com/thiagoabaguiar.png",
  "price-per-hour": 75,
  "monthly-budget": 5000,
  "days-per-week": 5,
  "hours-per-day": 8,
  "vacation-per-year": 4,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData
  }
};