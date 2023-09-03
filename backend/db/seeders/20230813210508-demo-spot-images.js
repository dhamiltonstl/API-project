'use strict';
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/a8ef5d47-0b5a-4189-abaf-322753e942b2.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/2477d0d5-7d92-43ca-a144-3c934dc57770.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/3abdf2bd-7b15-43bd-8e0a-7815660a8636.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/18d27719-890e-47b4-a3e5-02cf42d4ccca.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/5e6b7729-7a0a-4a9a-99a4-2edff94e879a.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/70a6f22f-6fbb-449e-ae39-b53ff8d84db7.jpg?im_w=720",
        preview: false
      },

      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-578116818093592631/original/dab3b1e3-57e6-436b-896e-76d2f78510fc.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/0316dc58-57c7-4003-b038-cf7caccd8972.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-578116818093592631/original/390501af-cd17-408d-9dab-f6ec66da2604.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/1d4c778b-50ed-4d58-a918-a9be06dcec93.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-578116818093592631/original/5f8558ec-4a73-4581-b88c-e1cc32c6cba0.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-578116818093592631/original/0293dd39-66d0-4c35-8c3c-b582d728b783.jpeg?im_w=720",
        preview: false
      },

      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-821131767710362097/original/ea2728ea-159c-43c5-8891-b59930dab046.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-821131767710362097/original/630aef6b-bffc-4489-8e52-bf0a6e7d463a.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-821131767710362097/original/5dd28d83-d84a-435a-964a-67621dfdb917.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-821131767710362097/original/3db25d19-8b96-48f8-9ed4-ec4d4b65bb43.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-821131767710362097/original/618e80a4-62df-47c2-888c-d1c80518e13a.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-821131767710362097/original/8b258ea6-1251-4523-947d-b9f69729eb07.jpeg?im_w=720",
        preview: false
      },

      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/861656e3-914e-49e7-bb09-eef97126052a.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/8997db91-2c7e-4063-b1e9-53a204a494d5.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/3812b1b3-1c56-48f5-a722-ff13fece9e12.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/b8ad702c-841a-4788-a96f-d82d1f8cc4ac.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/341681aa-a761-4b2b-972b-c7e512de0b8c.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/8190bf5d-31e9-4ccb-8bda-4a383367c082.jpg?im_w=1200",
        preview: false
      },

      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47051400/original/2b9c593f-2027-4f97-a1f7-6eabd4605b5c.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/11ced846-0a9f-4057-9a20-6d2c9dba471a.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/298f4683-1fbe-48bd-a7a7-5458c53388c0.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/e9a58203-5a49-42c7-aa72-f5be41a3b3d3.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/d779ca4e-0182-4ad9-a8a2-8f4916a222f9.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/960a3a8a-e16a-416d-af3c-eabda3462707.jpg?im_w=720",
        preview: false
      },

      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/11baa9df-fd29-4491-ba90-341c6f8fe861.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/0b900dca-3623-4469-87ad-6df22b7733b6.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/e604b980-3716-4f77-84e3-e73d6293c5c3.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/65f3b520-7916-4b88-805a-3340cd324783.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/3701c76f-e854-4b8d-bc9d-f110fe2d1166.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/e068b8bb-c326-40d5-8bfc-c8f441020693.jpg?im_w=720",
        preview: false
      },

      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/7cc1977a-7091-4e4a-97ec-322fe6adc7d2.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/1b78fea1-23a1-414e-a2d2-455f703251f6.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/02f8c00e-4b35-4421-b9c2-17b8cbb3fe0f.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/233d77c4-bcc0-49ab-8f6b-421e0bf80784.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/1d1b3a54-2f5a-4f1a-bdb0-216717279202.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/09bd5bbb-f700-44c5-a95c-14a14ec55200.jpg?im_w=720",
        preview: false
      },

      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/02a6b6df-bb89-4721-ba7f-c703d94a99d4.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/794e91e5-32f5-4605-932f-0622d65c0cda.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/9e30417a-672e-4fd2-8510-d64a5a081bc6.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/4e989c54-4927-497b-a25b-9dfd365a9d18.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/802bc522-f1ee-414d-b224-d8fccf45dd87.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/d0f174f6-35fe-4969-98f0-c139973091d7.jpg?im_w=720",
        preview: false
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
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
