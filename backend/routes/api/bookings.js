const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const { Booking, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateBooking = [
   check('endDate')
      .exists({ checkFalsy: true })
      .withMessage('endDate cannot be on or before startDate')
];

router.get('/current', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const userBookings = await Booking.findAll({
      where: {
         userId: userId
      }
   })

   res.json(userBookings)
})

router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
   const userId = req.user.id;
   const booking = await Booking.findByPk(req.params.bookingId);
   const { startDate, endDate } = req.body;

   if (!booking) {
      res.status(404);
      res.json({
         "message": "Booking couldn't be found"
      })
   }

   if (booking.userId == userId) {
      booking.set({
         startDate: startDate,
         endDate: endDate
      })
      await booking.save();
      res.json(booking)
   } else {
      res.status(401);
      res.json({
         "message": "Unauthorized update"
      })
   }
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const booking = await Booking.findByPk(req.params.bookingId);
   if (!booking) {
      res.status(404);
      res.json({
         "message": "Booking couldn't be found"
      })
   }
   const spot = await Spot.findByPk(booking.spotId)
   if (booking.userId == userId || spot.ownerId == userId) {
      booking.destroy()
      res.json({
         "message": "Successfully deleted"
      })
   } else {
      res.status(401);
      res.json({
         "message": "Unauthorized deletion"
      })
   }
})

module.exports = router;
