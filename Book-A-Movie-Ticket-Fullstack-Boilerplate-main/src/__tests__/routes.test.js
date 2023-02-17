const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');  // importing the server file

chai.use(chaiHttp);

describe('Booking API', () => {
    // Testing the POST route
    describe('POST /api/booking', () => {
        it('it should create a new booking', (done) => {
            let booking = {
                movie: "Inception",
                slot: "2:00 PM",
                seats: {
                    A1: 1,
                    A2: 1,
                    A3: 0,
                    A4: 1,
                    D1: 1,
                    D2: 1
                }
            }
            chai.request(server)
                .post('/api/booking')
                .send(booking)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { bookingDetails: booking });
                    done();
                });
        });
    });

    // Testing the GET route
    describe('GET /api/booking', () => {
        it('it should fetch the last booking', (done) => {
            chai.request(server)
                .get('/api/booking')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { lastBooking: booking });
                    done();
                });
        });
    });
});