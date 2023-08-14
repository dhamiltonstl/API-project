const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const { Review, ReviewImage } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const reviewImage = await ReviewImage.findByPk(req.params.imageId);
   const review = await Review.findByPk(reviewImage.reviewId)

   if (!reviewImage) {
      res.status(404);
      res.json({
         "message": "Spot Image couldn't be found"
      })
   }
   if (review.userId == userId) {
      reviewImage.destroy()
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
