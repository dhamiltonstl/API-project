const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

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
   const reviewArr = { 'Reviews': [] }
   const userId = req.user.id;
   const reviews = await Review.findAll({
      where: {
         userId: userId
      }
   })
   for (let review of reviews) {
      const jsonReview = review.toJSON()
      const user = await User.findOne({
         attributes: ['id', 'firstName', 'lastName'],
         where: {
            id: jsonReview.userId
         }
      })
      jsonReview.User = user;
      const spot = await Spot.findOne({
         attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
         where: {
            id: jsonReview.spotId
         }
      })
      const jsonSpot = spot.toJSON()
      jsonReview.Spot = jsonSpot;
      const previewImages = await SpotImage.findAll({
         where: {
            spotId: spot.id
         }
      })
      for (let image of previewImages) {
         const jsonImg = image.toJSON()
         console.log(jsonImg)
         if (jsonImg.preview == true) {
            jsonReview.Spot.previewImage = jsonImg.url
         } else {
            jsonReview.Spot.previewImage = "Preview Image Unavailable"
         }
      }
      const reviewImages = await ReviewImage.findAll({
         attributes: ['id', 'url'],
         where: {
            reviewId: jsonReview.id
         }
      })
      jsonReview.ReviewImages = reviewImages;

      reviewArr.Reviews.push(jsonReview)
   }
   res.json(reviewArr)
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
         const newImg = await ReviewImage.findOne({
            attributes: ['id', 'url'],
            where: {
               id: review.id
            }
         })
         res.json(newImg)
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
