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
      {
        ownerId: 1,
        address: '123 Fake St',
        city: 'China Grove',
        state: 'North Carolina',
        country: 'United States',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Cherry Treesort "Big Nick"',
        description: 'This tree house is very unique. It features two separate sleeping quarters to give renters the ability to accommodate more friends and enjoy time together but also have private time at night. Its 25 feet up in the trees and has plenty of nature coming through and around the decks. Its also has all the amenities one would want for comfort in the main house with heat/ AC, TV, Shower, and Toilet. The bunk house also has TV/DVD, heat and AC. Come enjoy nature at its best.',
        price: 175
      },
      {
        ownerId: 2,
        address: '123 Fake Rd',
        city: 'Lake Ozark',
        state: 'Missouri',
        country: 'United States',
        lat: 38.6258477,
        lng: -90.1865787,
        name: 'Awesome Lakefront A-Frame Cabin!',
        description: 'Experience the Ultimate Lake Ozark getaway in this unique, newly renovated A-FRAME! If you’ve never stayed in an A-Frame, you’re going to want to stay here…situated in a cove, the bright and airy 3-bedroom, 2-bath cabin offers serene views and a modern interior. It has plenty of “Selfie Walls" & an outdoor living space with a private dock full of fun! It’s located near many attractions like the infamous Bagnell Dam Strip. Perfect for relaxing, fishing, or wet and wild fun!',
        price: 239
      },
      {
        ownerId: 3,
        address: '123 Fake Ln',
        city: 'Innsbrook',
        state: 'Missouri',
        country: 'United States',
        lat: 41.9487177,
        lng: -87.6554185,
        name: 'Aspen Shores',
        description: 'This beautiful, cabin inspired, modern chalet sits just steps away from Innsbrook’s second largest lake, Lake Aspen, offering amazing waterfront views from every angle. Aspen Shores Pt. II is the perfect place to fish, watch sailboats float by, or enjoy water activities on 150-acre Lake Aspen. Plus, all of Innsbrook’s resort-style amenities are just a hop, skip, and a jump away from your front door.',
        price: 776
      },
      {
        ownerId: 1,
        address: '123 Fake Dr',
        city: 'Langley',
        state: 'Kentucky',
        country: 'United States',
        lat: 41.9487177,
        lng: -87.6554185,
        name: 'The Bluegrass Palace',
        description: 'There is a special place, nestled amidst the rolling hills of Kentucky bluegrass, where 29,000 square feet of unmitigated luxury welcomes you. Where the private gates open to a 9 acre idyllic paradise all your own.',
        price: 703
      },
      {
        ownerId: 2,
        address: '123 Fake Pkwy',
        city: 'Kenton',
        state: 'Tennessee',
        country: 'United States',
        lat: 41.9487177,
        lng: -87.6554185,
        name: 'Romantic Winery Loft Suite',
        description: 'Nestled in the middle of the largest fruit producing vineyard in the state, You will have a bottle of your choice of White Squirrel wine waiting In your room, and fresh flowers from the farm. Once settled in, weather-permitting, I’ll take you on an ATV ride around the vineyard to view and learn about the vines, roses, orchards and berry brambles. Breakfast will be county style... home grown blueberries in pancakes, bacon and eggs and seasonal fresh fruit from the farm.',
        price: 179
      },
      {
        ownerId: 3,
        address: '321 Fake Rd',
        city: 'Anna',
        state: 'Illinois',
        country: 'United States',
        lat: 41.9487177,
        lng: -87.6554185,
        name: 'AdamsRock Cabin #2',
        description: 'Luxury Camping with a taste of Native America! Stay in a hand made oak timber cabin, on the historical "Trail of Tears" in Union County, Illinois.  This lodging offers the rustic appeal of an authentic cabin in the woods, with the all the creature comforts and amenities of contemporary hotel stay.',
        price: 209
      },
      {
        ownerId: 1,
        address: '321 Fake St',
        city: 'Dauphin Island',
        state: 'Alabama',
        country: 'United States',
        lat: 41.9487177,
        lng: -87.6554185,
        name: 'Sunset view 4BR Oceanfront',
        description: 'This spacious, custom-built beach house is ready to be your next getaway at the Gulf. Located directly on the beach, this home features designer furnishings throughout, four bedrooms and baths, a fabulous great room with a 65" flatscreen TV, and a gourmet kitchen with stainless steel appliances, a granite island, and a breakfast bar. The two Gulf-facing bedrooms have plush king-size beds, and sliders leading out to the large open and covered decks. Guests will also enjoy free WiFi, Direct TV, and smart TVs in all the bedrooms. The underside of the home is well lit with a boardwalk from the front to the back complete with swings for both kids and adults, a sandbox, BBQ area, and an outdoor shower.',
        price: 592
      },
      {
        ownerId: 2,
        address: '321 Fake Ln',
        city: 'Cortez',
        state: 'Colorado',
        country: 'United States',
        lat: 41.9487177,
        lng: -87.6554185,
        name: 'Private Sage Canyon Cliff House',
        description: 'Stay on the flank of Sleeping Ute Mountain in historic McElmo Canyon just 40 minutes from Mesa Verde and 20 minutes from the town of Cortez. The Cliff House is built right into the red rock cliff wall of a private red rock canyon alcove with comfortable amenities, internet, nearby petroglyphs and sweeping views down canyon. A perfect place to base yourself for your next creative endeavor or for exploring in the wilds of the four corners.',
        price: 328
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
