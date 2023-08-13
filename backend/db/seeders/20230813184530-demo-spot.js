'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await Spot.bulkCreate([
      // User 'Demo-lition' Spots
      {
        ownerId: 1,
        address: '123 Disney Ln',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123
      },
      {
        ownerId: 2,
        address: '1 Metropolitan Sq',
        city: 'St. Louis',
        state: 'Missouri',
        country: 'United States of America',
        lat: 38.6258477,
        lng: -90.1865787,
        name: 'Gateway Arch',
        description: 'Curved, 630-ft.-tall monument celebrating US western expansion, with views from the top & a museum.',
        price: 100
      },
      {
        ownerId: 3,
        address: '1060 W Addison St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States of America',
        lat: 41.9487177,
        lng: -87.6554185,
        name: 'Wrigley Field',
        description: 'Ivy-clad walls & manual scoreboard add retro charm to the 2nd oldest baseball stadium in the majors.',
        price: 130
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: {
        [Op.in]: [
          '123 Disney Ln',
          '1 Metropolitan Sq',
          '1060 W Addison St'
        ]
      }
    }, {});
  }
};
