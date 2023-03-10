const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const bookMovieSchema = new Schema({
    movie: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    seats: {
        A1: Schema.Types.Number,
        A2: Schema.Types.Number,
        A3: Schema.Types.Number,
        A4: Schema.Types.Number,
        D1: Schema.Types.Number,
        D2: Schema.Types.Number
    }
})

exports.BookMovieTickets = new mongoose.model('bookmovieticket', bookMovieSchema) // for tests
exports.bookMovieSchema = bookMovieSchema;

