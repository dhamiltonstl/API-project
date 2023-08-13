'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      // Spot 1 reviews
      {
        spotId: 1,
        userId: 1,
        review: 'Good spot',
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Wonderful',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Been there, done that',
        stars: 1
      },
      // Spot 2 reviews
      {
        spotId: 2,
        userId: 1,
        review: 'Its cool',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Pretty cool',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: 'It was okay',
        stars: 2
      },
      // Spot 3 reviews
      {
        spotId: 3,
        userId: 1,
        review: 'Cozy, comfy',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Best ever',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Bad traffic',
        stars: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
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
