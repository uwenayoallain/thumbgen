const chai = require("chai");
const http = require("chai-http");
const server = require("../server");
let should = chai.should();
const mongoose = require("mongoose");
let User = require("../models/user.model");
chai.use(http);
describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
});

describe("/POST user/signup", () => {
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
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have.property("type").eql("Error");
        res.body.should.have.property("message").eql("Missing required fields");
        done();
      });
  });
  it("it should post a user with all fields", (done) => {
    let user = {
      username: "user",
      email: "user@example.com",
      password: "Yarrisongmail.com@123!",
    };
    chai
      .request(server)
      .post("/user/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("User created successfully");
        done();
      });
  });
});
