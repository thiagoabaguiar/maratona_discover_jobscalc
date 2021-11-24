const express = require("express")
const server = express()
const routes = require("./routes.js")

// habilitar template/view engine
server.set("view engine", "ejs")

// habilitar rotas para arquivos estáticos
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

// listen
server.listen(3000, () => console.log("rodando"))