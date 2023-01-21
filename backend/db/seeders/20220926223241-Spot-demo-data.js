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
        ownerId:1,
        address: '123 ABC st.',
        city:'San Jose',
        state:'CA',
        country:'USA',
        lat:15.55,
        lng:-100.12,
        name:'Alpha',
        description:"very chill, very good location",
        price: 120
      },
      {
        ownerId:2,
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
        ownerId:3,
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
        ownerId:4,
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
        ownerId:5,
        address: '789 GHI st.',
        city:'SaltLakeCity',
        state:'CA',
        country:'USA',
        lat:50.50,
        lng:-50.50,
        name:'Ferran',
        description:"Get away from it all in our rustic cabin, nestled in the heart of the Sierra Nevada mountains. Our 2-bedroom, 1-bathroom cabin is the perfect place to escape the hustle and bustle of everyday life and reconnect with nature. Enjoy hiking, skiing, and fishing in the surrounding wilderness, or simply relax on the cabin's large deck and take in the stunning mountain views. ",
        price: 222
      },
      {
        ownerId:3,
        address: '890 HIJ st.',
        city:'Los Angeles',
        state:'CA',
        country:'USA',
        lat:60.60,
        lng:-60.60,
        name:'Big Light',
        description:"Take a short walk to the beach for swimming and sunbathing, or explore the nearby towns for shopping and dining. With comfortable furnishings and plenty of outdoor space, our vacation home is the perfect place for your next family vacation.",
        price: 666
      },
      {
        ownerId:2,
        address: '901 IJK st.',
        city:'San Diego',
        state:'CA',
        country:'USA',
        lat:30.30,
        lng:-60.60,
        name:'June',
        description:"Experience the beauty of New England at our charming vacation home in the heart of Cape Cod. Our 3-bedroom, 2-bathroom cottage is located on a quiet street and features a spacious living area, fully equipped kitchen and a large deck that is perfect for dining al fresco.",
        price: 456
      },
      {
        ownerId:1,
        address: '555 JKL st.',
        city:'San Diego',
        state:'CA',
        country:'USA',
        lat:30.30,
        lng:-60.60,
        name:'May',
        description:"Escape to our tropical paradise vacation home, located on the white sandy beaches of Florida's Gulf Coast. Our 2-bedroom, 2-bathroom condo is fully furnished and equipped with all the amenities you need for a comfortable stay.",
        price: 55
      },
      {
        ownerId:4,
        address: '888 KLM st.',
        city:'Chicago',
        state:'Michigan',
        country:'USA',
        lat:30.30,
        lng:-60.60,
        name:'The Rock',
        description:"With a variety of shops and restaurants nearby, and easy access to all the area's top attractions, our vacation home is the perfect place for your next vacation.",
        price: 999
      },
      {
        ownerId:2,
        address: '654 LMN st.',
        city:'San Jose',
        state:'CA',
        country:'USA',
        lat:30.30,
        lng:-60.60,
        name:'Sun',
        description:"Our 2-bedroom, 2-bathroom condo is fully furnished and equipped with all the amenities you need for a comfortable stay. Spend your days lounging by the pool, or take a short walk to the beach for swimming and sunbathing.",
        price: 74
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
       ownerId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10] }
     }, {});
  }
};
