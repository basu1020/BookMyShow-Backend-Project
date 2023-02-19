// tests for schema model
// const mongoose = require('mongoose')
const { BookMovieTickets }  = require('../schema')

const db = require('./db')

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

describe('Creating document in MongoDB', () => {
    it('Creates a new movie Booking', async () => {
        const newMovieBookingInstance = await BookMovieTickets.create({
            movie: "Avengers",
            slot: "10:00 AM",
            seats: {
                A1: 0,
                A2: 0,
                A3: 3,
                A4: 0,
                D1: 0,
                D2: 0
            }
        })

        const justBookedMovieInstance = await BookMovieTickets.findById(newMovieBookingInstance._id)
        expect(justBookedMovieInstance.movie).toEqual("Avengers")
        expect(justBookedMovieInstance.slot).toEqual("10:00 AM")
        expect(justBookedMovieInstance.seats).toEqual({
            A1: 0,
            A2: 0,
            A3: 3,
            A4: 0,
            D1: 0,
            D2: 0
        })
    })
})
