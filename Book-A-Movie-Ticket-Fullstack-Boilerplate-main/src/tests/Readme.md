# Testing Overview

For testing there's a mongodb server instance created in memory using `mongodb-memory-server` in `db.js` and functions to connect, close and clear database.
After that `beforeAll`, `afterEach` and `afterAll` is used to connect, clear and close database respectively in between tests. 
Lastly, tests for schema and server have been written in `schema.test.js` and `router.test.js`. 
 
