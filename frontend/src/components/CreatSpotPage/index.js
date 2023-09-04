import React from "react";
import './CreateSpotPage.css'

function CreateSpotPage() {
   return (
      <div className="new-spot-page">
         <div className="form-container">
            <form>
               <div className="address">
                  <h2>Create a New Spot</h2>
                  <h4>Where is your spot located?</h4>
                  <p>Guests will only get your exact address once they book a reservation.</p>
                  <input
                     type="text"
                     placeholder="Country"
                  />
                  <input
                     type="text"
                     placeholder="Address"
                  />
                  <input
                     type="text"
                     placeholder="City"
                  />
                  <input
                     type="text"
                     placeholder="State"
                  />
               </div>
               <div className="description">
                  <h4>Describe your place to guest</h4>
                  <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                  <input
                     type="text"
                     placeholder="Please write at least 30 characters"
                  />
               </div>
               <div className="title">
                  <h4>Create a title for your spot</h4>
                  <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                  <input
                     type="text"
                     placeholder="Name of your spot"
                  />
               </div>
               <div className="price">
                  <h4>Set a base price for your spot</h4>
                  <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                  <input
                     type="text"
                     placeholder="Price per night (USD)"
                  />
               </div>
               <div className="photos">
                  <h4>Liven up your spot with photos</h4>
                  <p>Submit a link to at least one photo to publish your spot.</p>
                  <input
                     type="text"
                     placeholder="Preview Image URL"
                  />
                  <input
                     type="text"
                     placeholder="Image URL"
                  />
                  <input
                     type="text"
                     placeholder="Image URL"
                  />
                  <input
                     type="text"
                     placeholder="Image URL"
                  />
                  <input
                     type="text"
                     placeholder="Image URL"
                  />
               </div>
               <button id="submit-button">Submit</button>
            </form>
         </div>
      </div>
   )
}
export default CreateSpotPage;
