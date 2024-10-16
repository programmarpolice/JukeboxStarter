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

router.post("/:id/playlists", async (req, res, next) => {
  try {
    const { name, userId, trackIds } = req.body;

    // Converts array of ids into shape needed for `connect`
    const tracks = trackIds.map((id) => ({ id: +id }));

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        owner: +userId,
        tracks: { connect: tracks },
      },
      include: {
        playlist: true,
        tracks: true,
      },
    });
    res.status(201).json(reservation);
  } catch (e) {
    next(e);
  }
});
