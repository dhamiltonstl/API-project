'use strict';
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      // Spot 1 bookings
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-11-19',
        endDate: '2023-11-21'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-04-15',
        endDate: '2023-04-16'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2022-07-23',
        endDate: '2022-07-29'
      },
      // Spot 2 bookings
      {
        spotId: 2,
        userId: 1,
        startDate: '2024-12-24',
        endDate: '2024-12-26'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-05-10',
        endDate: '2023-05-11'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2024-02-05',
        endDate: '2024-02-07'
      },
      // Spot 3 bookings
      {
        spotId: 3,
        userId: 1,
        startDate: '2021-04-10',
        endDate: '2021-04-15'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2024-03-01',
        endDate: '2024-03-04'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-10-30',
        endDate: '2023-10-31'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [
          1,
          2,
          3
        ]
      }
    }, {});
  }
};
