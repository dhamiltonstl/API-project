const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const { Spot, SpotImage, Review } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res) => {
   const userId = req.user.id;
   const spotImage = await SpotImage.findByPk(req.params.imageId);
   const spot = await Spot.findByPk(spotImage.spotId)

   if (!spotImage) {
      res.status(404);
      res.json({
         "message": "Spot Image couldn't be found"
      })
   }
   if (spot.ownerId == userId) {
      spotImage.destroy()
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
