import express from "express"

const app = express()

const PORT = 3000

app.get("/hello", (request, response) => {
    response.send("Hello David!")
})

app.get("/users/:userId", (request, response) => {
    response.send("Hello, " + request.params.userId)
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
