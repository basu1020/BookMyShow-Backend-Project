// tests for schema model 

const mongoose = require('mongoose');
const bookMovieSchema = require('../schema');
const expect = require('expect');

console.log(expect)
describe('bookMovieSchema', () => {
    let movie;
    let slot;
    let seats;
    let connection;

    before(async () => {
        connection = await mongoose.createConnection('mongodb://localhost/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    beforeEach(() => {
        movie = "Movie A";
        slot = "12:00 PM";
        seats = {
            A1: 1,
            A2: 0,
            A3: 2,
            A4: 1,
            D1: 0,
            D2: 1
        }
    });

    after(async () => {
        await connection.close();
    });

    it('should create a valid bookMovie', async () => {
        const BookMovie = mongoose.model('BookMovie', bookMovieSchema)
        const validBookMovie = new BookMovie({ movie, slot, seats });
        validBookMovie.validate((error) => {
            expect(error).toBeFalsy();
        });
    });
});

    // it('should return error if movie is not provided', () => {
    //     movie = "";
    //     const BookMovie = mongoose.model('BookMovie', bookMovieSchema)
    //     const invalidBookMovie = new BookMovie({ movie, slot, seats });
    //     expect(validateSync(invalidBookMovie).errors.movie.message).toBe('Path `movie` is required.');
    // });

    // it('should return error if slot is not provided', () => {
    //     slot = "";
    //     const BookMovie = mongoose.model('BookMovie', bookMovieSchema)
    //     const invalidBookMovie = new BookMovie({ movie, slot, seats });
    //     expect(validateSync(invalidBookMovie).errors.slot.message).toBe('Path `slot` is required.');
    // });

    // it('should return error if seats is not provided', () => {
    //     seats = {};
    //     const BookMovie = mongoose.model('BookMovie', bookMovieSchema)
    //     const invalidBookMovie = new BookMovie({ movie, slot, seats });
    //     expect(validateSync(invalidBookMovie).errors.seats.message).toBe('Path `seats` is required.');
    // });

