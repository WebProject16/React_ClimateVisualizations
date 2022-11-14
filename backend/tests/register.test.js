const request = require("supertest");
const app = require("../app");
const crypto = require("crypto");

describe("Test user register", () => {
    const user = crypto.randomUUID();

    test("Registering user with username and password", done => {

        const body = {
            username: crypto.randomUUID(),
            password: "newUser",
            password_rpt: "newUser"
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("Registering user but passwords dont match", done => {

        const body = {
            username: crypto.randomUUID(),
            password: "newUser",
            password_rpt: "passwordsDontmatch"
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });

    test("Registering user, but missing password", done => {

        const body = {
            username: "newUser123123",
            password: "newUser"
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });
  
});

afterAll(done => {
    done()
})