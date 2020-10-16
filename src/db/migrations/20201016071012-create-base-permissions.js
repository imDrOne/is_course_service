module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Permissions', [{
      permissionName: 'canCreateUsers',
      userId: 1,
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
