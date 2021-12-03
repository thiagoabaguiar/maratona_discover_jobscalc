let data = [
    // {
    //     id: 1,
    //     name: "Pizzaria Guloso",
    //     "daily-hours": 10,
    //     "total-hours": 10,
    //     budget: 5000,
    //     createdAt: Date.now()
    // },
    // {
    //     id: 2,
    //     name: "OneTwo Project",
    //     "daily-hours": 4,
    //     "total-hours": 20,
    //     budget: 4000,
    //     createdAt: Date.now(),
    // },
];

module.exports = {
    get() {
        return data
    },

    save(newJob) {
        data.push(newJob)
    },

    update(newJob) {
        data = newJob
    },

    delete(jobId) {
        data = data.filter((data) => Number(jobId) !== Number(data.id));
    }
}