const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const { Review, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
   check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
   check('address')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5')
];

router.get('/current', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const reviews = await Review.findAll({
      where: {
         userId: userId
      }
   })
   res.json(reviews)
})

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
   const userId = req.user.id;
   const reviewData = await Review.findByPk(req.params.reviewId);
   const { review, stars } = req.body;

   if (!reviewData) {
      res.status(404);
      res.json({
         "message": "Review couldn't be found"
      })
   }
   if (reviewData.userId == userId) {
      reviewData.set({
         review: review,
         stars: stars
      })
      await reviewData.save()
      res.json(reviewData)
   } else {
      res.status(401);
      res.json({
         "message": "Unauthorized update"
      })
   }
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const review = await Review.findByPk(req.params.reviewId);
   const { url } = req.body;

   if (!review) {
      res.status(404);
      res.json({
         "message": "Review couldn't be found"
      })
   }

   const imgPerResource = await ReviewImage.findAll({
      where: {
         reviewId: review.id
      }
   })
   const count = imgPerResource.length

   if (review.userId == userId) {
      if (count < 10) {
         const reviewImage = await ReviewImage.create({
            reviewId: review.id,
            url: url
         })
         await reviewImage.save()
         res.json(reviewImage)
      } else {
         res.status(403);
         res.json({
            "message": "Maximum number of images for this resource was reached"
         })
      }
   } else {
      res.status(401);
      res.json({
         "message": "Unauthorized creation"
      })
   }

})

router.delete('/:reviewId', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const review = await Review.findByPk(req.params.reviewId);
   if (!review) {
      res.status(404);
      res.json({
         "message": "Review couldn't be found"
      })
   }
   if (review.userId == userId) {
      review.destroy()
      res.json({
         "message": "Successfully deleted"
      })
   } else {
      res.status(401)
      res.json({
         "message": "Unauthorized deletion"
      })
   }
})

module.exports = router;
