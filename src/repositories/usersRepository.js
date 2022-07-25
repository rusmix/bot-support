class UsersRepository {
    constructor(prisma) {
        this.user = prisma.user;
    }

    async create(user) {
        return this.user.create({data: {...user}});
    }

    async findById(id) {
        return this.user.findFirst({
            where: {
                id: String(id)
            },
        });
    }
}

module.exports = UsersRepository;