const express = require("express");

const details = require("./object.js");

const query = express();

query.get("/details", (req, res) => {
  const result = [...details];
  const userId = req.query;
  const listSelected = result.filter((item) => {
    console.log(item.name);
    console.log(userId.name);
    if (userId.id === item.id) {
      return item;
    }
  });
  console.log(listSelected);
  res.send(listSelected);
});

query.listen(3000, () => console.log("Hello There"));
