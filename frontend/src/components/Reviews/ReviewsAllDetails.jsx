import { useSelector } from "react-redux";

function ReviewsAllDetails({id}){
    const allReviews = useSelector(state=>state.reviews.reviews.all);
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <>
        <div>
        {allReviews.map((review, i)=>{
          let d = new Date(Date.parse(review.updatedAt));
          console.log("date: ",d);
          let month = d.getUTCMonth();
          let year = d.getUTCFullYear();
          if(review.spotId.toString() === id.toString()){
            return (
              <div key={i}>
                <h3>{review.User.firstName}</h3>
                <h4>{`${MONTHS[month]} ${year}`}</h4>
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
