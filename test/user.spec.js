process.env.NODE_ENV = "test";
let { describe, before, it } = require("mocha");
let chai = require("chai");
let http = require("chai-http");
let server = require("../server");
let User = require("../models/user.model");
chai.use(http);
let { expect } = chai;
describe("Users", () => {
  before((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe("POST user/signup", () => {
    it("it should not Post a user without a password", (done) => {
      let user = {
        username: "user",
        email: "user@example.com",
      };
      chai
        .request(server)
        .post("/user/signup")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res).to.be.json;
          expect(res.body)
            .to.have.property("message")
            .equals("Missing required fields");
          expect(res.body).to.have.property("type").equals("Error");
          done();
        });
    });
    it("it should post a user with all fields", (done) => {
      let user = {
        username: "username",
        email: "username@example.com",
        password: "Yarrisongmail.com@123!",
      };
      chai
        .request(server)
        .post("/user/signup")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body)
            .to.have.property("message")
            .equals("User created successfully");
          expect(res.body).to.have.property("type").equals("Success");
          done();
        });
    });
  });
  describe("POST user/login", () => {
    it("it should not login a user without a password", (done) => {
      let user = {
        email: "username@example.com",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res).to.be.json;
          expect(res.body)
            .to.have.property("message")
            .equals("Missing required fields");
          expect(res.body).to.have.property("type").equals("Error");
          done();
        });
    });
    it("it should login a user with all fields", (done) => {
      let user = {
        email: "username@example.com",
        password: "Yarrisongmail.com@123!",
      };

      chai
        .request(server)
        .post("/user/login")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property("message")
            .equals("User logged in succcessfully");
          expect(res.body).to.have.property("type").equals("Success");
          expect(res.body).to.have.property("token").is.a("string");
          done();
        });
    });
  });
});
