const records = [
  {
    permissionName: 'can__CreateUsers',
  },
  {
    permissionName: 'can__ViewUsers',
  },
  { permissionName: 'can__EditUsers' },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('permissions', records, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
