import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'



function SpotCard({ spot }) {
   return (
      <div className='spot-card' title={spot.name}>
         <Link to={`/spot/${spot.id}`}>

            <img className='spot-img' src={spot.previewImage}></img>
            <div className='card-info'>
               <h4 id='city-state'>{`${spot.city}, ${spot.state}`}</h4>
               <div id='price'>{`$${spot.price}/night`}</div>
               <div id='stars'>
                  <i class="fa-solid fa-star"></i>
                  {spot.avgRating !== 'NaN' ? spot.avgRating : 'New'}
               </div>
            </div>
         </Link>
      </div>
   )
}

export default SpotCard
