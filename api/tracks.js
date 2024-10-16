const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");
// const prisma = require("../../JukeboxMini/prisma");

router.get("/", async (req, res, next) => {
  try {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const track = await prisma.track.findUniqueOrThrow({
      where: { id: +id },
      include: { playlists: true },
    });
    res.json(track);
  } catch (e) {
    next(e);
  }
});
