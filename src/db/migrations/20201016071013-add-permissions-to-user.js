const records = [
  {
    userId: 1,
    permissionId: 1,
  },
  {
    userId: 1,
    permissionId: 2,
  },
  {
    userId: 1,
    permissionId: 3,
  },
  {
    userId: 2,
    permissionId: 2,
  },
  {
    userId: 2,
    permissionId: 3,
  },
  {
    userId: 3,
    permissionId: 2,
  },
  {
    userId: 3,
    permissionId: 2,
  },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users_as_permissions', records, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users_as_permissions', null, {});
  },
};
