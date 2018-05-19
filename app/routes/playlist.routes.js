module.exports = app => {
  const playlists = require("../controllers/playlist.controller.js");

  app.post("/playlists", playlists.create);
  app.get("/playlists", playlists.findAll);
  app.get("/playlists/:playlistId", playlists.findOne);
  app.put("/playlists/:playlistId", playlists.update);
  app.delete("/playlists/:playlistId", playlists.delete);
};
