const express = require("express");
const app = express();

app.use(express.static("./dist/books-spa"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/books-spa/" });
});

app.listen(process.env.PORT || 8080);
