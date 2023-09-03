import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'



function SpotCard({ spot }) {
   return (
      <div className='spot-card'>
         <Link to={`/spot/${spot.id}`}>

            <img className='spot-img' src={spot.previewImage}></img>
         </Link>
         <div className='card-info'>
            <h4 id='city-state'>{`${spot.city}, ${spot.state}`}</h4>
            <div id='price'>{`${spot.price}/night`}</div>
            <div id='stars'>{spot.avgRating}</div>
         </div>
      </div>
   )
}

export default SpotCard
