'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password: '123456',
      firstName: 'phat',
      lastName: 'ho',
      address: 'mai giang',
      phoneNumber: '0964511323',
      gender: 1,
      image: 'ROLasdasdE',
      RoleId: 'R1',
      positionId: 'Doctor',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
