const http = require("http")
const express = require("express")
const routes = require("./src/routes")

const PORT = 3000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//http://localhost:3001/api
app.use("/api", routes)

app.get("/", (req, res) => res.json({ 'server' : 'up'}))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

/*http.createServer(app)
    .listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})*/