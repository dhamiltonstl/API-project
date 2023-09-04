import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleSpot } from '../../store/spots'
import './SpotDetailsPage.css'
import ReservationButton from './ReserveButton'
import SpotReviews from '../SpotReviews'

function SpotDetailsPage() {
   const dispatch = useDispatch()
   const params = useParams()

   const spot = useSelector(state => state.spots.singleSpot)

   useEffect(() => {
      dispatch(getSingleSpot(params.spotId))
   }, [dispatch])


   if (Object.keys(spot).length === 0 || !spot) {
      return null
   }
   let previewImage = {}
   const createImgArr = (singleSpot) => {
      const imgArr = []
      for (let img of singleSpot.SpotImages) {
         if (img.preview === false) {
            if (imgArr.length < 4) {
               imgArr.push(img)
            }
         } else {
            previewImage = img
         }
      }
      return imgArr
   }

   const imgArr = createImgArr(spot)
   let imgIdx = 0

   return (
      <div className='details-page'>
         <div className='inner-page'>
            <div className='img-container'>
               <img id='preview-image' src={previewImage.url}></img>
               <div className='img-grid'>
                  {imgArr.map((img) => {
                     imgIdx += 1;

                     return (
                        <img id={`img-${imgIdx}`} src={img.url}></img>
                     )
                  })}
               </div>
            </div>
            <div className='details-container'>
               <div className='details'>
                  <h2>{spot.name}</h2>
                  <h4>{spot.city}, {spot.state}, {spot.country}</h4>
                  <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                  <p>{spot.description}</p>
               </div>
               <ReservationButton spot={spot} />
            </div>
            <SpotReviews spot={spot} />
         </div>
      </div>
   )
}

export default SpotDetailsPage;
