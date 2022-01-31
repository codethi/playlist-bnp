require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./database/db");

const app = express();

connectDB();

const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
