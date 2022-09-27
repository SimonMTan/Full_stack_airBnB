'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('SpotImages',[
       {
         spotId:1,
         url:'www.one.com',
         preview:true
       },
       {
        spotId:2,
        url:'www.two.com',
        preview:true
      },
      {
        spotId:3,
        url:'www.three.com',
        preview:true
      },
      {
        spotId:4,
        url:'www.four.com',
        preview:true
      },
      {
        spotId:5,
        url:'www.five.com',
        preview:true
      },
      {
        spotId:6,
        url:'www.six.com',
        preview:true
      }
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('SpotImages',{
       spotId:{[Op.in]:[1,2,3,4,5,6]}
     })
  }
};
