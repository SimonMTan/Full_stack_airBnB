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
     await queryInterface.bulkInsert('Spots',[
      {
        ownerId:2,
        address: '123 ABC st.',
        city:'Sanjose',
        state:'CA',
        country:'USA',
        lat:15.55,
        lng:-100.12,
        name:'Alpha',
        description:"very chill, very good location",
        price: 120
      },
      {
        ownerId:3,
        address: '234 BCD st.',
        city:'SanMateo',
        state:'CA',
        country:'USA',
        lat: 12.55,
        lng: -90.34,
        name:'Beta',
        description:"located in center of SM, driving distance to San Francisco and San Jose",
        price: 100
      },
      {
        ownerId:4,
        address: '345 CDE st.',
        city:'Oakland',
        state:'CA',
        country:'USA',
        lat:23.45,
        lng:-65.19,
        name:'Charlie',
        description:"very safe side of Oakland and just half an hour drive to SanFrancisco",
        price: 80
      },
      {
        ownerId:5,
        address: '456 DEF st.',
        city:'NewYork',
        state:'NY',
        country:'USA',
        lat:50.55,
        lng:-112.63,
        name:'Delta',
        description:"Walking distance to Timesquare",
        price: 150
      },
      {
        ownerId:6,
        address: '567 EFG st.',
        city:'Seattle',
        state:'WA',
        country:'USA',
        lat:20.20,
        lng:-40.40,
        name:'Echo',
        description:"great location to great restaurants and parks ",
        price: 60
      },
      {
        ownerId:7,
        address: '678 FGH st.',
        city:'Utah',
        state:'CA',
        country:'USA',
        lat:30.30,
        lng:-60.60,
        name:'Juliet',
        description:"driving distance to Dion Park",
        price: 70
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
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete('Spots', {
       ownerId: { [Op.in]: [2,3,4,5,6,7] }
     }, {});
  }
};
