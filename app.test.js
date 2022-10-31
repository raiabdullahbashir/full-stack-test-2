const request = require("supertest");
const app = require("./server.js");

describe("Post EndPoint", () => {
  it("should not sign in ", async () => {
    const res = await request(app).post("/auth/login/").send({
      email: "ab20",
      password: "85200",
    });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.text).errors[0].msg).toBe("Invalid Credentials");
  });
});

describe("Post EndPoint", () => {
  it("should sign in ", async () => {
    const res = await request(app).post("/auth/login/").send({
      email: "ab20",
      password: "8520",
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).msg).toBe("Successfully signed in.");
  });
});
// this is test incase there are done todos
// if there is no done todos exist we have to write
// another test case
describe("Get EndPoint", () => {
  it("should get all done TODOs", async () => {
    const res = await request(app)
      .get("/todo/marked_done/")
      .set(
        "auth", // you have to provide here jwt token to get desired results
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1ZWI3ZGI0NWU2NWUyZGMyYjE2NTk1In0sImlhdCI6MTY2NzE5NjAwNiwiZXhwIjoxNjY3MTk5NjA2fQ.rLivDTeUrDOdzBcpHqZE7sVcEM_hCBNmHp8gz7CJ7Uw"
      )
      .send();

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).msg).toBe("Done TODOs found.");
  });
});
// this is test incase there is no incomplete todos
// for existentance of incomplete todos we have to write
// another test case
describe("Get EndPoint", () => {
  it("should get all done TODOs", async () => {
    const res = await request(app)
      .get("/todo/incomplete/")
      .set(
        "auth", // you have to provide here jwt token to get desired results
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1ZWI3ZGI0NWU2NWUyZGMyYjE2NTk1In0sImlhdCI6MTY2NzE5NjAwNiwiZXhwIjoxNjY3MTk5NjA2fQ.rLivDTeUrDOdzBcpHqZE7sVcEM_hCBNmHp8gz7CJ7Uw"
      )
      .send();

    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res.text).msg).toBe("Incomplete TODOs not found.");
  });
});
