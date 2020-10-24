module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('permissions', [{
      permissionName: 'canCreateUsers',
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
