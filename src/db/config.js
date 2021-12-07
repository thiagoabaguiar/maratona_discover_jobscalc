const sqlite3 = require("sqlite3") // serão usadas todas as funcionalidades
const { open } = require("sqlite") // será usada apenas a funcionalidade "open"


module.exports = () => open({ filename: "./database.sqlite", driver: sqlite3.Database })