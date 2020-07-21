const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

describe("User validation tests", () => {
    test("That a user is not created if the username already exists", async () => {
        const newUser = {
            "username": "sameName",
            "password": "p@ssw0rd",
            "name": "Someone"
        }
        const existingUser = {
            "username": "sameName",
            "password": "p@ssw0rd",
            "name": "Someone else"
        }

        await api.post("/api/login").send(newUser)
        await api.post("/api/login").send(existingUser).expect(401)
    })

    test("That a user is not created if the username is too small", async () => {
        const newUser = {
            "username": "a",
            "password": "p@ssw0rd",
            "name": "Someone"
        }

        await api.post("/api/login").send(newUser).expect(401)
    })
    test("That a user is not created if the password is too small", async () => {
        const newUser = {
            "username": "longname",
            "password": "hi",
            "name": "Someone"
        }

        await api.post("/api/login").send(newUser).expect(401)
    })
})
