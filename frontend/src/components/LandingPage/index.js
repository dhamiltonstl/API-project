import React, { useEffect } from 'react'
import SpotCard from './SpotCard'
import { useDispatch } from 'react-redux'
import { getSpots, getSingleSpot } from '../../store/spots'
import { getReviews } from '../../store/reviews'


function SpotCardPage() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getSpots())
   }, [dispatch])

   useEffect(() => {
      dispatch(getSingleSpot())
   }, [dispatch])

   useEffect(() => {
      dispatch(getReviews())
   }, [dispatch])

   return (
      <div>
         <SpotCard />
         to be mapped
      </div>
   )
}

export default SpotCardPage

