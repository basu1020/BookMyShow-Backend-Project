// tests for schema model
const mongoose = require('mongoose')
const bookMovieSchema = require('../schema')
const assert = require('assert')
const BookMovieSchema = mongoose.model('bookMovieSchema', bookMovieSchema)

describe('Creating document in MongoDB', () => {
    it('Creates a new movie Booking', (done) => {
        const BookMovie = new BookMovieSchema({
            movie: "Avengers",
            slot: "02:00 AM",
            seats: {
                A1: 1,
                A2: 1,
                A3: 0,
                A4: 1,
                D1: 1,
                D2: 1
            }
        })
        BookMovie.save().then(() => {
            assert(!newUser.isNew)
            done()
        })
    })
})
