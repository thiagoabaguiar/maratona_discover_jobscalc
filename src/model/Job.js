let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 10,
        "total-hours": 10,
        budget: 5000,
        createdAt: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 4,
        "total-hours": 20,
        budget: 4000,
        createdAt: Date.now(),
    },
];

module.exports = {
    get() {
        return data
    },

    update(newData) {
        data = newData
    }
}