import React from "react";

function PostReviewModal() {
   return (
      <div>
         <form>
            <h2>How was your stay?</h2>
            <input
               type="text"
               placeholder="Leave your review here..."
            />
            <div>Stars</div>
            <button>Submit Your Review</button>
         </form>
      </div >
   )
}
export default PostReviewModal
