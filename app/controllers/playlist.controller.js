const Playlist = require("../models/playlist.model.js");

exports.create = (req, res) => {
  // Validation
  if (!req.body.tracks) {
    return res.status(400).send({
      message: "playlist content can not be empty",
    });
  }

  let reqTracks = req.body.tracks.split(",");

  const playlist = new Playlist({
    title: req.body.title || "Untitled Playlist",
    tracks: reqTracks,
    author: req.body.author,
  });

  console.log(playlist);
  playlist
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the playlist.",
      });
    });
};

exports.findAll = (req, res) => {
  Playlist.find()
    .then(playlists => {
      res.send(playlists);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving playlists.",
      });
    });
};

exports.findOne = (req, res) => {
  Playlist.findById(req.params.playlistId)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: "playlist not found with id " + req.params.playlistId,
        });
      }
      res.send(playlist);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "playlist not found with id " + req.params.playlistId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving playlist with id " + req.params.playlistId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "playlist content can not be empty",
    });
  }

  Playlist.findByIdAndUpdate(
    req.params.playlistId,
    {
      title: req.body.title || "Untitled playlist",
      content: req.body.content,
    },
    { new: true }
  )
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: "playlist not found with id " + req.params.playlistId,
        });
      }
      res.send(playlist);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "playlist not found with id " + req.params.playlistId,
        });
      }
      return res.status(500).send({
        message: "Error updating playlist with id " + req.params.playlistId,
      });
    });
};

exports.delete = (req, res) => {
  Playlist.findByIdAndRemove(req.params.playlistId)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: "playlist not found with id " + req.params.playlistId,
        });
      }
      res.send({ message: "playlist deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "playlist not found with id " + req.params.playlistId,
        });
      }
      return res.status(500).send({
        message: "Could not delete playlist with id " + req.params.playlistId,
      });
    });
};
