const express = require("express");
const app = express();
const port = process.env.PORT || 10001;

const cors = require('cors');
var corsOptions = {
  origin: "http://localhost:63342",
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const mysql = require("./mysql"),
  user = require("./user"),
  passwords = require("./passwords");

app.get("/api/users/new", (req, resp) => {
  const data = {
    Username: req.query.Username,
    Email: req.query.Email,
    Password: req.query.Password,
  };
  
  if (data.Username && data.Email && data.Password) {
    //insert the basic data into the database
    mysql.insert("users", {Username: data.Username, Email: data.Email})
      .then((response) => {
        // hash the password that was recieved
        passwords.hashPassword(data.Password)
          .then((hash) => {
            // take the hash and insert it to the database, along with the ID of the user that was created for reference
            mysql.insert("passwords", {UserID: response.insertId, Password: hash})
              .then((response) => {
                resp.send({status: "Resolved", resp: response});
              })
          })
      }).catch((data) => {
      resp.send({status: "Rejected", resp: data});
    });
  }
  else {
    resp.send({status: "Error", resp: "Blank fields."});
  }
});

app.get("/api/users/all", (req, resp) => {
  mysql.selectAll("users")
    .then((data) => {
      resp.send({status: "Resolved", resp: data});
    })
    .catch((data) => {
      resp.send({status: "Rejected", resp: data});
    });
});

app.get("/api/users/verify", (req, resp) => {
  user.verify(req.query.Username, req.query.Password)
    .then((data) => {
      resp.send({status: "Resolved", resp: data});
    })
    .catch((data) => {
      resp.send({status: "Rejected", resp: data});
    });
});
app.listen(port, () => console.log(`Listening on port ${port}`));