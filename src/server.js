const express = require("express"); // chamando o servidor de página "express"
const server = express(); // colocando o express dentro do server
const routes = require("./routes"); // colocando o arquivo routes.js dentro da constante
const path = require("path"); // chamando o método path

// habilitando o listen
server.listen(3000, () => console.log("Server UP"));

// habilitando o ejs como mecanismo de renderização (template/view engine)
server.set("view engine", "ejs");

// habilitando a localização da pasta views, onde deverão estar os arquivos ejs
server.set("views", path.join(__dirname, "views"));

// habilitando rotas para todos os arquivos públicos/estáticos
server.use(express.static("public"));

// habilitando a utilização do req.body para detalhamento do corpo da requisição
server.use(express.urlencoded({ extended: true }));

// habilitando o uso da constante routes
server.use(routes);