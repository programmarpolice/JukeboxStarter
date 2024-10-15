const prisma = require("");

const seed = async (numUsers = 5, numTracks = 20) => {
  const users = Array.from({ length: numUsers }, (_, i) => ({
    username: `User ${i + 1}`,
  }));
  await prisma.user.createMany({ data: users });

  const tracks = Array.from({ length: numTracks }, (_, i) => ({
    name: `Track ${i + 1}`,
  }));
  await prisma.track.createMany({ data: tracks });

  const numPlaylists = 10;
  for (let i = 0; i < numPlaylists; i++) {
    const trackNumber = 8 + Math.floor(Math.random() * 20);
    const trackId = Array.from({ length: trackNumber }, () => ({
      id: 1 + Math.floor(Math.random() * numTracks),
    }));
    await prisma.playlist.create({
      data: {
        name: `Playlist ${(i = 1)}`,
        description: "Here is a description",
        ownerId: 1 + Math.floor(Math.random() * numPlaylists),
        trackId: { connect: trackId },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
