const express = require("express");
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // to send data from form
// app.use(express.static("./public/"));

let errorMessage = {};

app.post("/register", (req, res) => {
  let regex = new RegExp(
    /^([a-zA-z0-9_\.\-])+\@(([a-zA-z0-9])+\.)+([a-zA-z0-9]{2,4})+$/g
  );
  const { name, email, contact, dob } = req.body;
  console.log(name.length);
  if (name.length == 0) {
    errorMessage.name = "Name Field Can't be empty";
  }

  if (contact.length != 10) {
    errorMessage.contact = "Contact Should be of 10 digits";
  } else {
    if (!/^\d+$/.test(contact)) {
      errorMessage.contact += " Contact Should Contain Only Number";
    }
  }

  if (!regex.test(email)) {
    errorMessage.email = "Email Invalid";
  }

  if (errorMessage.name && errorMessage.contact && errorMessage.email) {
    errorMessage.result = "Registration Unsuccessfull";
  } else {
    errorMessage.result = "Registration Successfull.";
  }

  res.json(errorMessage);
  // errorMessage = {};
  //res.json(req.body);
});
app.listen(3000, () => console.log("Register User"));
