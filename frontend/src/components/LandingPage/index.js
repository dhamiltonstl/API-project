import React, { useEffect } from 'react'
import SpotCard from './SpotCard'
import { useDispatch } from 'react-redux'
import { getSpots } from '../../store/spots'


function SpotCardPage() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getSpots())
   }, [dispatch])


   return (
      <div>
         <SpotCard />
         to be mapped
      </div>
   )
}

export default SpotCardPage

