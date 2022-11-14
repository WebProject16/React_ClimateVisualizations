const request = require("supertest");
const app = require("../app");
const crypto = require("crypto");

describe("Test user register", () => {
    const user = crypto.randomUUID();

    test("Registering user with username and password", done => {

        const body = {
            username: crypto.randomUUID().substring(0, 30),
            password: "newUser",
            password_rpt: "newUser"
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("msg")
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
                expect(response.body).toHaveProperty("msg")
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
                expect(response.body).toHaveProperty("msg")
                done();
            });
    });

    test("Registering user, with too short password", done => {

        const body = {
            username: "newUser12312223",
            password: "ne",
            password_rpt: "ne"
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty("msg")
                done();
            });
    });

    test("Registering user, with too long username", done => {

        const body = {
            username: "137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05",
            password: "137a8df3-1a09-4ef0-8532-65f616b84e05",
            password_rpt: "137a8df3-1a09-4ef0-8532-65f616b84e05"
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty("msg")
                done();
            });
    });
  
});

afterAll(done => {
    done()
})