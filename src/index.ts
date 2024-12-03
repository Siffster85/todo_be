import express from "express";
import listRouter from "./routes/list.router";
import itemRouter from "./routes/item.router";
import cors from "cors";

const app = express()
const port = 8000

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],}))

app.use(express.json())

app.use("/lists", listRouter)
app.use("/items", itemRouter)

app.get('/ping', (req, res) => {
    res.json({ message:'ping'}).status(200)
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

module.exports = app