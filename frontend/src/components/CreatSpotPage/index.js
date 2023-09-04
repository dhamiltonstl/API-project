import React, { useState } from "react";
import './CreateSpotPage.css'
import { useDispatch } from "react-redux";
import { createSpotImg, createUserSpot } from "../../store/spots";

function CreateSpotPage() {
   const dispatch = useDispatch()

   const [country, setCountry] = useState("")
   const [state, setState] = useState("")
   const [city, setCity] = useState("")
   const [address, setAddress] = useState("")
   const [description, setDescription] = useState("")
   const [name, setName] = useState("")
   const [price, setPrice] = useState(null)
   const [previewImgUrl, setPreviewImgUrl] = useState("")
   const [imgUrls, setImgUrls] = useState([])

   const handleSubmit = (e) => {
      e.preventDefault()

      const data = {
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
      console.log(imgData)

      const createRes = dispatch(createUserSpot(data))
      console.log("createRes: ", createRes)
      const spotId = createRes.id


      dispatch(createSpotImg(spotId, imgData))
   }

   return (
      <div className="new-spot-page">
         <div className="form-container">
            <form onSubmit={handleSubmit}>
               <div className="address">
                  <h2>Create a New Spot</h2>
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
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     type="text"
                     placeholder="Address"
                  />
                  <input
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     type="text"
                     placeholder="City"
                  />
                  <input
                     value={state}
                     onChange={(e) => setState(e.target.value)}
                     type="text"
                     placeholder="State"
                  />
               </div>
               <div className="description">
                  <h4>Describe your place to guest</h4>
                  <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                  <input
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     type="text"
                     placeholder="Please write at least 30 characters"
                  />
               </div>
               <div className="title">
                  <h4>Create a title for your spot</h4>
                  <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                  <input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     type="text"
                     placeholder="Name of your spot"
                  />
               </div>
               <div className="price">
                  <h4>Set a base price for your spot</h4>
                  <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                  <input
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     type="text"
                     placeholder="Price per night (USD)"
                  />
               </div>
               <div className="photos">
                  <h4>Liven up your spot with photos</h4>
                  <p>Submit a link to at least one photo to publish your spot.</p>
                  <input
                     value={previewImgUrl}
                     onChange={(e) => setPreviewImgUrl(e.target.value)}
                     type="text"
                     placeholder="Preview Image URL"
                  />
                  <input
                     value={imgUrls}
                     onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                     type="text"
                     placeholder="Image URL"
                  />
                  <input
                     value={imgUrls}
                     onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                     type="text"
                     placeholder="Image URL"
                  />
                  <input
                     value={imgUrls}
                     onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                     type="text"
                     placeholder="Image URL"
                  />
                  <input
                     value={imgUrls}
                     onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                     type="text"
                     placeholder="Image URL"
                  />
               </div>
               <button id="submit-button" type="submit">Create Spot</button>
            </form>
         </div>
      </div>
   )
}
export default CreateSpotPage;
