import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleSpot } from '../../store/spots'

function SpotDetailsPage() {
   const dispatch = useDispatch()
   const params = useParams()
   console.log(params)

   useEffect(() => {
      dispatch(getSingleSpot(params.spotId))
   }, [dispatch])

   const spot = useSelector(state => state.spots.singleSpot)
   console.log('spot: ', spot)


   return (
      <div>
         <h2>{spot.name}</h2>
         <h4>{spot.city}, {spot.state}, {spot.country}</h4>
         <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
         <p>{spot.description}</p>
      </div>
   )
}

export default SpotDetailsPage;
