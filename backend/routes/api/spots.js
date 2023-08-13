const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const { Spot, SpotImage, Review, Booking } = require('../../db/models');

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

const validateReview = [
   check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
   check('address')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5')
];

const validateBooking = [
   check('endDate')
      .exists({ checkFalsy: true })
      .withMessage('endDate cannot be on or before startDate')
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
});

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
   const userId = req.user.id;
   const spotId = req.params.spotId;
   const spot = await Spot.findByPk(spotId)
   const { review, stars } = req.body;

   if (!spot) {
      res.status(404)
      res.json({
         "message": "Spot couldn't be found"
      })
   }
   const reviewed = await Review.findAll({
      where: {
         spotId: Number(spotId),
         userId: userId
      }
   })
   if (reviewed) {
      res.status(403)
      res.json({
         "message": "User already has a review for this spot"
      })
   } else {
      const newReview = await Review.create({
         userId,
         spotId,
         review,
         stars
      })
      await newReview.save()
      res.status(201)
      res.json(newReview)
   }
});

router.get('/:spotId/reviews', async (req, res) => {
   const spot = await Spot.findByPk(req.params.spotId)
   if (!spot) {
      res.status(404)
      res.json({
         "message": "Spot couldn't be found"
      })
   }

   const reviews = await Review.findAll({
      where: {
         spotId: req.params.spotId
      }
   })
   res.json(reviews)
})

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
   const userId = req.user.id;
   const spot = await Spot.findByPk(req.params.spotId);
   const { startDate, endDate } = req.body;
   if (!spot) {
      res.status(404);
      res.json({
         "message": "Spot couldn't be found"
      })
   }
   // const bookingPerSpot = await Booking.findOne({
   //    where: {
   //       spotId: spot.id,

   //    }
   // })
   if (spot.ownerId !== userId) {
      const booking = await Booking.create({
         spotId: spot.id,
         userId: userId,
         startDate: startDate,
         endDate: endDate
      })
      booking.save();
      res.json(booking);
   } else {
      res.status(401);
      res.json({
         "message": "Cannot book your owned spot"
      })
   }
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const spot = await Spot.findByPk(req.params.spotId);
   if (!spot) {
      res.status(404);
      res.json({
         "message": "Spot couldn't be found"
      })
   }
   const bookings = await Booking.findAll({
      where: {
         spotId: req.params.spotId
      }
   })
   res.json(bookings)
})

module.exports = router;
