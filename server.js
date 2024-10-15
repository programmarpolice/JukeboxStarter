const prisma = require("./prisma");
app.post("/playlists", async (req, res, next) => {
  try {
    const { name, ownerId, trackIds } = req.body;

    // Converts array of ids into shape needed for `connect`
    const tracks = trackIds.map((id) => ({ id: +id }));

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: +ownerId,
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
