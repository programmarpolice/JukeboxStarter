const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // We can throw an error instead of checking for a null user
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id },
      include: { playlists: true },
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// app.post("/playlists", async (req, res, next) => {
//   try {
//     const { name, userId, trackIds } = req.body;

//     // Converts array of ids into shape needed for `connect`
//     const tracks = trackIds.map((id) => ({ id: +id }));

//     const playlist = await prisma.playlist.create({
//       data: {
//         name,
//         description,
//         owner: +userId,
//         tracks: { connect: tracks },
//       },
//       include: {
//         playlist: true,
//         tracks: true,
//       },
//     });
//     res.status(201).json(reservation);
//   } catch (e) {
//     next(e);
//   }
// });
