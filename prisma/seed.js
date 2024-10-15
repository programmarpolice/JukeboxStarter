const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numUsers = 5, numTracks = 20, numPlaylists = 10) => {
  const users = Array.from({ length: numUsers }, () => ({
    username: faker.person.fullName(),
  }));
  await prisma.user.createMany({ data: users });

  const tracks = Array.from({ length: numTracks }, () => ({
    name: faker.person.fullName(),
  }));
  await prisma.track.createMany({ data: tracks });

  for (let i = 0; i < numPlaylists; i++) {
    const trackNumber = 8 + Math.floor(Math.random() * 20);

    const tracks = Array.from({ length: trackNumber }, () => ({
      id: 1 + Math.floor(Math.random() * numTracks),
    }));

    await prisma.playlist.create({
      data: {
        name: faker.music.songName(),
        description: "Here is a description",
        owner: {
          connect: {
            id: Math.floor(Math.random() * numUsers + 1),
          },
        },
        tracks: { connect: tracks },
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
