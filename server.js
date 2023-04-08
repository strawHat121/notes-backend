const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Note = require("./models/notes")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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

app.get("/allNotes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        res.status(200).json(note);
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

app.put('/editnote/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body)
        if (!note) {
            return res.status(404).json({ message: `Cannot find any product with the id ${id}` });
        }
        const updatedNote = await Note.findById(id)
        res.status(200).json(updatedNote)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
})

app.delete('/deletenote/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id)
        if (!note) {
            return res.status(404).json({ message: `Cannot find any product with the id ${id}` });
        }
        res.status(200).json(note)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to mongo")
    app.listen(3000, () => {
        console.log('Node API is running')
    })
}).catch((error) => {
    console.log(error)
})