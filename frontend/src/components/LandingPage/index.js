import React, { useEffect } from 'react'
import SpotCard from './SpotCard'
import { useDispatch, useSelector } from 'react-redux'

import { getSpots } from '../../store/spots'
import './LandingPage.css';


function SpotCardPage() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getSpots())
   }, [dispatch])

   const allSpots = useSelector(state => state.spots.allSpots)

   const spotsArr = Object.values(allSpots)

   return (
      <div className='spot-card-page'>

         <div className='card-container'>
            {spotsArr.map((spot) => (
               <SpotCard className='spot-card' spot={spot} />
            ))}
         </div>

      </div>
   )
}

export default SpotCardPage

