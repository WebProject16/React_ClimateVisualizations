const request = require("supertest");
const app = require("../app");
const crypto = require("crypto");

describe("Test user register", () => {

    test("Registering user with username and password", done => {

        const body = {
            username: crypto.randomUUID().substring(0, 8),
            password: "newUser1",
            password_rpt: "newUser1"
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
            username: "newUser123123"
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

    test("Registering user, with wrong types", done => {

        const body = {
            username: 13246579,
            password: 13246579,
            password_rpt: 13246579
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                console.log(response.body.msg);
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty("msg")

                done();
            });
    });

    test("Registering user, with illegal characters", done => {

        const body = {
            username: "❤️ 💔 💌 💕 💞 💓 💗 ",
            password: "0xffffffffffffffff",
            password_rpt: "0xffffffffffffffff"
        }

        request(app)
            .post("/user/register")
            .send(body)
            .then(response => {
                console.log(response.body.msg);
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty("msg")

                done();
            });
    });

});

afterAll(done => {
    done()
})