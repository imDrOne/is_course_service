module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Permissions', [{
      permissionName: 'canCreateUsers',
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
