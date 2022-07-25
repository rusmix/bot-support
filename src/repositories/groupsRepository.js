class GroupsRepository {
    constructor(prisma) {
        this.group = prisma.group;
    }

    async create(group) {
        return this.group.create({data: {...group}});
    }

    async findAll() {
        return this.group.findMany({
            include: {
                users: true
            }
        });
    }

    async findById(id) {
        return this.group.findFirst({
            where: {
                id: id
            },
        });
    }

    // async getGroup(user) {
    //     try {
    //         return (await this.prisma.user.findFirst({
    //             where: {
    //                 id: user.id
    //             },
    //             select: {
    //                 group: true,
    //             }
    //         })).group;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

module.exports = GroupsRepository;