const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../../JukeboxMini/prisma");

router.get("/", async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: +id },
      include: { tracks: true, owner: true },
    });
    if (playlist) {
      res.json(playlist);
    } else {
      next({ status: 404, message: `Playlist with id ${id} does not exist.` });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const {
    name,
    description,
    ownerId,
    tracks: { connect: tracks },
  } = req.body;
  try {
    const playlist = await prisma.playlist.create({
      data: { name, description, ownerId, tracks },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});
