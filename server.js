const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Note = require("./models/notes")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.get("/allnotes", async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/create", async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json(note)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
})


mongoose.connect('mongodb+srv://kinjalkbajpai:kinjalkbajpai@cluster0.3g8okrk.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Connected to mongo")
    app.listen(3000, () => {
        console.log('Node API is running')
    })
}).catch((error) => {
    console.log(error)
})