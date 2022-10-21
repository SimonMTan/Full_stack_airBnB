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
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: "This is Great!",
        stars: 5
      }, {
        spotId: 2,
        userId: 2,
        review: "This is Good!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: "This is Awesome!",
        stars: 5
      },
      {
        spotId: 4,
        userId: 4,
        review: "This is Fantastic!",
        stars: 4
      },
      {
        spotId: 5,
        userId: 5,
        review: "This is unique and beautiful!",
        stars: 4
      },
      {
        spotId: 6,
        userId: 6,
        review: "This place is so beautiful, will book again!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 6,
        review: "This place is so beautiful, will book again!",
        stars: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {})
  }
};
