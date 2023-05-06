const express = require("express");
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // to send data from form
// app.use(express.static("./public/"));
let message = "";

app.post("/register", (req, res) => {
  const { name, email, contact, dob } = req.body;
  if (name.length == 0) {
    message += "Name Feild Was Empty\n";
  }
  if (contact.length == 0) {
    message += "Contact Feild was Empty";
  } else {
    if (!/^\d+$/.test(contact)) {
      message += "Contact Should Contain Only Number\n";
    }
  }
  if (message.length == 0) {
    message = "Registration Successfull";
  } else {
    message += "Registration Unsuccessfull.";
  }

  res.json(message);
  //res.json(req.body);
});
app.listen(3000, () => console.log("Register User"));
