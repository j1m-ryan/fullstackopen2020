const mongoose = require("mongoose")
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("blogs are successfully returned", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
})

test("unique identifier property of the blog posts is named id", async () => {
    const blogs = await api.get("/api/blogs");
    for (let blog of blogs.body) {
        await expect(blog.id).toBeDefined()
    }
})

test("making an HTTP POST request to the /api/blogs url successfully creates a new blog post", async () => {
    const newPost = {
        title: "Test title",
        author: "Test author",
        url: "https://www.test.com",
        likes: 100,
    }
    await api.post("/api/blogs").send(newPost).expect(201).expect("Content-Type", /application\/json/)
})

afterAll(() => {
    mongoose.connection.close();
})