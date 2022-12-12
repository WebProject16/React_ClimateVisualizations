const request = require("supertest");
const app = require("../app");
const crypto = require("crypto");

describe("Test user delete", () => {
    
    const user = "deleteUserTest1";
    const password = "password1234";
    let token = '';

    test("Registering user with username and password", done => {

        const body = {
            username: user,
            password: password,
            password_rpt: password
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

test("Loggin in with username and password", done => {

    const body = {
        username: user,
        password: password
    }

    request(app)
        .post("/user/login")
        .send(body)
        .then(response => {
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("msg");
            expect(response.body).toHaveProperty("token");
            token = response.body.token;
            
            done();
        });
});

test("Deleting user but with no password field", done => {

    const body = {
        username: user
    }

    request(app)
        .delete("/user/deleteUser")
        .set("Authorization", 'Bearer ' + token)
        .send(body)
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty("msg")
            done();
        });
});

test("Deleting user but with no body", done => {

    request(app)
        .delete("/user/deleteUser")
        .set("Authorization", 'Bearer ' + token)
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty("msg")
            done();
        });
});

test("Deleting user that doesnt exist", done => {

    const body = {
        username: "NotExists",
        password: password
    }

    request(app)
        .delete("/user/deleteUser")
        .set("Authorization", 'Bearer ' + token)
        .send(body)
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty("msg")
            done();
        });
});


test("Deleting user with username and password", done => {

    const body = {
        username: user,
        password: password
    }

    request(app)
        .delete("/user/deleteUser")
        .set("Authorization", 'Bearer ' + token)
        .send(body)
        .then(response => {
            //console.log(token)
            //console.log(response.body)
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("status")
            expect(response.body).toHaveProperty("msg")
            
            done();

        });
});
});


afterAll(done => {
    done()
})