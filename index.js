require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./database/db");
const Music = require("./model/Music");

const app = express();

connectDB();

const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  const playlist = await Music.find();
  res.render("index", { playlist });
});

app.get("/getAll", async (req, res) => {
  const playlist = await Music.find();
  res.send(playlist);
});

app.get("/admin", async (req, res) => {
  const playlist = await Music.find();
  res.render("admin", { playlist });
});

app.post("/create", async (req, res) => {
  const music = req.body;
  await Music.create(music);
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id
  await Music.deleteOne({_id: id})
  res.redirect("/admin#player");
});




app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
