const express = require("express");
const app = express();
const port = process.env.PORT || "3001";
const fs = require("fs");

// var bodyParser = require("body-parser");
// app.use(bodyParser.json());

app.get("/list", (req, res) => {
  fs.readFile(__dirname + "/" + "user.json", (err, data) => {
    if (err) {
      res.send({ data: err });
    } else {
      res.send(data);
      console.log(data.toString("binary"));
    }
  });
});

//add operation  create
var user = {
  user3: {
    name: "Jene",
    password: "password3",
    profession: "student",
    id: 3,
  },
};

// to add data
app.post("/add", (req, res) => {
  fs.readFile(__dirname + "/user.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    data["user3"] = user["user3"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

//delete operation
// delete operation
app.delete("/deluser", (req, res) => {
  fs.readFile(__dirname + "/user.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    delete data["user" + 2];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

// find by id
app.get("/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    var users = JSON.parse(data);
    var user = users["user2" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

//listen port working
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
