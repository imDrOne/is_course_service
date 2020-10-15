const models = require('../../db/models');

const excludeOption = {
    attributes: {
        exclude: ['createdAt', 'updatedAt'],
    },
};

class UserService {
    static async getAllUsers(req, res) {
        const users = await models.User.findAll({
            ...excludeOption,
        });
        res.json(users);
    }

    static async getUserById(req, res) {
        const user = await models.User.findAll({
            where: { id: 2 },
            ...excludeOption,
        });

        res.json(user);
    }
}

module.exports = UserService;
