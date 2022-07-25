class UserService {
    constructor(usersRepository) {
        this.repository = usersRepository;
    }

    async create(user, groupId) {
        try {
            const existingUser = await this.repository.findById(user.id);
            if (existingUser) return;
            return this.repository.create({ ...user, groupId });
        } catch (e) {
            console.log(e);
        }
    }

    async findById(userId) {
        try {
            return this.repository.findById(userId);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = UserService;