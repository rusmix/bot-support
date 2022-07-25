class GroupService {
    constructor(groupRepository) {
        this.repository = groupRepository;
    }

    async findGroupWithMinimumUsers() {
        try {
            const groups = await this.repository.findAll();
            return groups.sort((a, b) => a.users.length - b.users.length)[0];
        } catch (e) {
            console.log(e);
        }
    }

    async create(groupId) {
        try {
            const existingGroup = await this.repository.findById(groupId);
            if (existingGroup) return;
            return this.repository.create({ id: groupId });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = GroupService;