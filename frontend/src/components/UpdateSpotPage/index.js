import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotImg, updateUserSpot, getSingleSpot } from "../../store/spots";
import { useParams } from "react-router-dom";


function UpdateSpotPage() {
   const dispatch = useDispatch()
   const params = useParams()

   const [country, setCountry] = useState("")
   const [state, setState] = useState("")
   const [city, setCity] = useState("")
   const [address, setAddress] = useState("")
   const [description, setDescription] = useState("")
   const [name, setName] = useState("")
   const [price, setPrice] = useState(null)
   const [previewImgUrl, setPreviewImgUrl] = useState("")
   const [imgUrls, setImgUrls] = useState([])

   const spot = useSelector((state) => state.spots.singleSpot)

   const handleSubmit = (e) => {
      e.preventDefault()

      const data = {
         spotId: params.spotId,
         country,
         state,
         city,
         address,
         description,
         name,
         price
      }

      const imgData = [
         {
            url: previewImgUrl,
            preview: true
         },
         {
            url: imgUrls[0],
            preview: false
         },
         {
            url: imgUrls[1],
            preview: false
         },
         {
            url: imgUrls[2],
            preview: false
         },
         {
            url: imgUrls[3],
            preview: false
         }
      ]
      // console.log(imgData)

      dispatch(updateUserSpot(data))

   }

   useEffect(() => {
      dispatch(getSingleSpot(params.spotId))
   }, [dispatch])

   useEffect(() => {
      if (!spot) {
         console.log("Spot not found")
      } else {
         setCountry(spot.country)
         setAddress(spot.address)
         setCity(spot.city)
         setState(spot.state)
         setDescription(spot.description)
         setName(spot.name)
         setPrice(spot.price)
      }
   }, [spot])

   return (
      <div className="new-spot-page">
         <div className="form-container">
            <form onSubmit={handleSubmit}>
               <div className="address">
                  <h2>Update your Spot</h2>
                  <h4>Where is your spot located?</h4>
                  <p>Guests will only get your exact address once they book a reservation.</p>
                  <input
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     required
                     type="text"
                     placeholder="Country"
                  />
                  <input
                     id="address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     type="text"
                     placeholder="Address"
                  />
                  <div className="city-state">
                     <input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        placeholder="City"
                     />
                     <h3 id="comma">,</h3>
                     <input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        placeholder="State"
                     />
                  </div>
               </div>
               <div className="description">
                  <h4>Describe your place to guest</h4>
                  <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                  <div className="discription-container">
                     <textArea
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                     >{description}</textArea>
                  </div>
               </div>
               <div className="title">
                  <h4>Create a title for your spot</h4>
                  <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                  <div className="name-container">
                     <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name of your spot"
                     />
                  </div>
               </div>
               <div className="price">
                  <h4>Set a base price for your spot</h4>
                  <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                  <div className="price-container">
                     <h3 id="dollar-sign">$</h3>
                     <input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        placeholder="Price per night (USD)"
                     />
                  </div>
               </div>
               <button id="submit-button" type="submit">Update Spot</button>
            </form>
         </div>
      </div>
   )
}
export default UpdateSpotPage;
