const GroupsRepository = require('./groupsRepository');
const UsersRepository = require('./usersRepository');
const prisma = require('./prismaClient');

module.exports = { GroupsRepository, UsersRepository, prisma };