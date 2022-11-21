const request = require("supertest");
const app = require("../app");
const crypto = require("crypto");

describe("Test user register", () => {
    const user = crypto.randomUUID().substring(0, 30);

    test("Registering user with username and password", done => {

        const body = {
            username: user,
            password: "password",
            password_rpt: "password"
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

    test("Loggin in but with no password field", done => {

        const body = {
            username: user
        }

        request(app)
            .post("/user/login")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty("msg")
                done();
            });
    });

    test("Loggin in but with no body", done => {

        request(app)
            .post("/user/login")
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty("msg")
                done();
            });
    });

    test("Loggin in with username and password", done => {

        const body = {
            username: user,
            password: "password"
        }

        request(app)
            .post("/user/login")
            .send(body)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("msg")
                expect(response.body).toHaveProperty("token")
                done();
            });
    });


    test("Loggin in with too long username and user that doesnt exist", done => {

        const body = {
            username: "137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05137a8df3-1a09-4ef0-8532-65f616b84e05",
            password: "password"
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