const express = require('express');
const { requireAuth } = require('../../utils/auth');

const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
   check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
   check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
   check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
   check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
   check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
   check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
   check('name')
      .exists({ checkFalsy: true })
      .withMessage('Name must be less than 50 characters'),
   check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
   check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
   handleValidationErrors
];

router.get('', async (req, res) => {
   const spots = await Spot.findAll()

   res.json(spots)
})

router.get('/current', requireAuth, async (req, res) => {
   const userId = req.user.id
   const spots = await Spot.findAll({
      where: {
         ownerId: userId
      }
   });
   res.json(spots)
});

router.get('/:spotId', async (req, res) => {
   const spot = await Spot.findByPk(req.params.spotId);
   if (!spot) {
      res.status(404)
      res.json({
         "message": "Spot couldn't be found"
      })
   }
   res.json(spot)
})

router.post('', requireAuth, validateSpot, async (req, res) => {

   const ownerId = req.user.id;
   const { address, city, state, country, lat, lng, name, description, price } = req.body;
   const spot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
   });
   await spot.save();

   const newSpot = await Spot.findOne({
      where: {
         name: name
      }
   });

   res.status(201);
   res.json(newSpot);
});

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
   const spot = await Spot.findByPk(req.params.spotId);
   const { address, city, state, country, lat, lng, name, description, price } = req.body;

   if (!spot) {
      res.status(404)
      res.json({
         "message": "Spot couldn't be found"
      })
   }

   if (req.user.id == spot.ownerId) {
      spot.set({
         address: address,
         city: city,
         state: state,
         country: country,
         lat: lat,
         lng: lng,
         name: name,
         description: description,
         price: price
      })

      await spot.save()

      res.json(spot)

   } else {
      res.status(401)
      res.json({
         "message": "Unauthorized update"
      })
   }
})

router.delete('/:spotId', requireAuth, async (req, res) => {
   const spot = await Spot.findByPk(req.params.spotId)
   if (!spot) {
      res.status(404)
      res.json({
         "message": "Spot couldn't be found"
      })
   }

   if (req.user.id == spot.ownerId) {
      spot.destroy()
      res.json({
         "message": "Successfully deleted"
      })
   } else {
      res.status(401)
      res.json({
         "message": "Unauthorized deletion"
      })
   }

});

router.post('/:spotId/images', requireAuth, async (req, res) => {
   const { url, preview } = req.body;
   const spotId = req.params.spotId
   const spot = await Spot.findByPk(spotId)

   if (!spot) {
      res.status(404)
      res.json({
         "message": "Spot couldn't be found"
      })
   }

   if (spot.ownerId == req.user.id) {
      const spotImage = await SpotImage.create({
         spotId,
         url,
         preview
      })
      await spotImage.save();
      const newSpotImage = await SpotImage.findOne({
         attributes: ['id', 'url', 'preview'],
         where: {
            id: spotImage.id
         }
      })
      res.json(newSpotImage);
   } else {
      res.status(401)
      res.json({
         "message": "Unauthorized image creation"
      })
   }
})

module.exports = router;
