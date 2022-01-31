const mongoose = require("mongoose");

const musictSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  album: {
    type: String,
    require: true,
  },
  linkMusic: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Music", musictSchema);
