'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'www.fake1.com'
      },
      {
        reviewId: 2,
        url: 'www.fake2.com'
      },
      {
        reviewId: 3,
        url: 'www.fake3.com'
      }, {
        reviewId: 4,
        url: 'www.fake4.com'
      },
      {
        reviewId: 5,
        url: 'www.fake5.com'
      },
      {
        reviewId: 6,
        url: 'www.fake6.com'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ReviewImages', null, {})
  }
};
