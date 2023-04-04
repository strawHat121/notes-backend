const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let noteSchema = new Schema({
    title: {
        type: String
    },
    note: {
        type: String
    }
})

module.exports = mongoose.model('Notes', noteSchema)