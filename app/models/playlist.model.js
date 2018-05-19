const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  title: String,
  tracks: Array,
  date: { type: Date, default: Date.now() },
  author: String,
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
