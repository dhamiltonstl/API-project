import React, { useEffect } from 'react'
import SpotCard from './SpotCard'
import { useDispatch } from 'react-redux'
import { getSpots, getSingleSpot } from '../../store/spots'
import { getReviews, getSingleSpotReview } from '../../store/reviews'
import { getBookings, getSingleSpotBookings } from '../../store/bookings'


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

   useEffect(() => {
      dispatch(getSingleSpotReview())
   }, [dispatch])

   useEffect(() => {
      dispatch(getBookings())
   }, [dispatch])

   useEffect(() => {
      dispatch(getSingleSpotBookings())
   }, [dispatch])

   return (
      <div>
         <SpotCard />
         to be mapped
      </div>
   )
}

export default SpotCardPage

