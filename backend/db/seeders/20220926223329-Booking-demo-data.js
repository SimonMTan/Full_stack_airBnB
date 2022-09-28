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
     await queryInterface.bulkInsert('Bookings', [
      {spotId:1,
       userId:1,
       startDate:'2023-01-01',
       endDate:'2023-01-03'
      },
      {spotId:2,
        userId:2,
        startDate:'2023-02-01',
        endDate:'2023-02-03'
       },
       {spotId:3,
        userId:3,                 //startingdate that i input cant be on startdate, endDate, cant be between them ,
        startDate:'2023-02-05',   //endingdate date that i input cant be on startdate, endDate, or between them
        endDate:'2023-02-08'
       },
       {spotId:4,
        // userId:4,             9 - 11
        startDate:'2023-02-10',
        endDate:'2023-02-15'
       },
       {spotId:5,
        userId:5,
        startDate:'2023-03-01',
        endDate:'2023-03-03'
       },
       {spotId:6,
        userId:6,
        startDate:'2023-03-05',
        endDate:'2023-03-10'
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
    await queryInterface.bulkDelete('Bookings',{
    spotId:{[Op.in]:[1,2,3,4,5,6]}
    })
  }
};
