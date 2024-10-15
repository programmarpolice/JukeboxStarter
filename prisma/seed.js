const prisma = require("");

const seed = async (numUsers = 5, numTracks = 20) => {
  const users = Array.from({ length: numUsers }, (_, i) => ({
    name: `User ${i + 1}`,
  }));
  await prisma.user.createMany({ data: users });

  const tracks = Array.from({ length: numTracks }, (_, i) => ({
    name: `Track ${i + 1}`,
  }));
  await prisma.track.createMany({ data: tracks });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
