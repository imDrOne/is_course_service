const records = [
  {
    permissionName: 'Создавать пользователей',
    permissionCode: 'can__CreateUsers',
  },
  {
    permissionCode: 'can__ViewUsers',
    permissionName: 'Просмотр пользователей',
  },
  {
    permissionCode: 'can__EditUsers',
    permissionName: 'Редактирование пользоватлей',
  },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('permissions', records, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
