const express = require("express");
const app = express();

app.use(express.json());

let record = [];

function registerUser(req, res, next) {
  let person = {};

  let { username, email, password, contact, dob } = req.body;

  let errorMessage = {};

  let regex = new RegExp(
    /^([a-zA-z0-9_\.\-])+\@(([a-zA-z0-9])+\.)+([a-zA-z0-9]{2,4})+$/g
  );

  if (username.length == 0) {
    errorMessage.username = "Username was empty";
  }

  if (!regex.test(email)) {
    errorMessage.email = "Invalid Email";
  }
  if (password.length < 8) {
    errorMessage.password = "Password should be of 8 characters";
  }

  if (errorMessage.username || errorMessage.email || errorMessage.password) {
    errorMessage.result = "Registration Unsuccessfull";
    errorMessage.register = false;
  } else {
    errorMessage.result = "Registration Successfull";
    errorMessage.register = true;
  }

  if (errorMessage.register) {
    person.username = username;
    person.email = email;
    person.password = password;
    person.contact = contact;
    person.dob = dob;
    record.push(person);
  }

  req.Validator = errorMessage;
  req.record = record;
  next();
}

function loginUser(req, res, next) {
  //
  const user = req.body;

  let login = false;
  record.filter((item) => {
    if (item.username == user.username && item.password == user.password) {
      console.log(item);
      login = true;
    }
  });

  req.login = login;
  next();
}

app.post("/registerUser", registerUser, (req, res) => {
  let { username, email, password, result, register } = req.Validator;
  console.log(record);
  res.send({ username, email, password, result, register });
});

app.post("/login", loginUser, (req, res) => {
  let isLogin = req.login;
  if (isLogin) {
    res.send("Logged In Successfully");
  } else {
    res.send("Login Failed");
  }
});

app.listen(3000, () => console.log("REGISTRATION"));
