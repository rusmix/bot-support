const Bot = require('./bot');
const prisma = require('./repositories/prismaClient');
const UsersRepository = require('./repositories/usersRepository');
const GroupsRepository = require('./repositories/groupsRepository');
const main = async () => {
    new Bot().initializeStrategies();
    const usersRepository = new UsersRepository(prisma);
    const groupsRepository = new GroupsRepository(prisma);
    console.log(await groupsRepository.findAll());
    console.log(await usersRepository.findById(123))
}

main();
