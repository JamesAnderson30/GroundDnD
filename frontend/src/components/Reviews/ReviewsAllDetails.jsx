import { useSelector } from "react-redux";

function ReviewsAllDetails({id}){
    const allReviews = useSelector(state=>state.reviews.reviews.all);
    console.log("allReviews: ", allReviews);
    return (
      <>
        <h2>Reviews</h2>
        <br/>
        <div>
        {allReviews.map((review, i)=>{
          if(review.spotId.toString() === id.toString()){
            return (
              <div key={i}>
                <h3>Review</h3>
                <p>{review.review}</p>
              </div>

            );
          } else {
            console.log("Didn't render review: ", review);
            console.log("And the ID: ", id);
          }
        })}
        </div>
      </>
    )
}



export default ReviewsAllDetails;
