const request = require('supertest');
const app = require('../index');

describe('Testing the /api/booking endpoint', () => {
  let server;
  let agent

  beforeAll(async () => {
    server = app.listen();
    agent = request.agent(server)
  });

  afterAll(async () => {
    await server.close();
  });

  it("It should respond to the GET method and send 200 status", async () => {
    const response = await agent.get('/api/booking');
    expect(response.statusCode).toBe(200);
  });

  it("It should POST new movie booking details", async () => {
    const response = await agent.post('/api/booking').send({
        movie: 'Scavengers',
        slot: '10:00 AM',
        seats: {
          A1: 0,
          A2: 0,
          A3: 3,
          A4: 0,
          D1: 0,
          D2: 0,
        },
    }).set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(200);

    const checkingResponse = await agent.get('/api/booking')
    expect(checkingResponse.body.movie).toBe("Scavengers")
    expect(checkingResponse.body.slot).toBe("10:00 AM")
  })
});
