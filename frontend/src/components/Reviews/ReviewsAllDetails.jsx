import { useSelector } from "react-redux";
import './Review.css'
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchReviewsBySpot } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewModel from "./ReviewModel/ReviewModel";
import ReviewDeleteModel from "./ReviewDeleteModel/ReviewDeleteModel";




function ReviewsAllDetails({id, spot}){

    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    /* MODEL */

      const [showMenu, setShowMenu] = useState(false);
      const ulRef = useRef();



      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const closeMenu = () => setShowMenu(false);

    /*   */

    let allowReview = false;
    let spotOwnerId = spot.User.id;



    if(user && user.id && spotOwnerId !== user.id) allowReview = true;

    for(let review of spot.Reviews){
      // console.log("review: ", review);
      // console.log("user.id: ", user.id);
      if(user && review.userId === user.id){
        allowReview = false;
      }
    }





    //I need to figure this out, refractor

    useEffect(()=>{
      if(user){
        dispatch(fetchReviewsBySpot(id));
      }

    }, [dispatch,id, spot,user])


    if(spot.Reviews.length && spot.Reviews.length > 0){
      return (
        <>
          {(allowReview)? (
             <OpenModalButton
              buttonText="Leave your review"
              onButtonClick={closeMenu}
              modalComponent={<ReviewModel
                spot={spot}
                user={user}
              />}
             />)
            : null
          }
          <div>
            {spot.Reviews.map((review, i)=>{
              let d = new Date(Date.parse(review.updatedAt));

              let month = d.getUTCMonth();
              let year = d.getUTCFullYear();
                return (
                  <div className={"SingleReview"} key={i}>

                    <h3>{review.User.firstName}</h3>
                    <h4>{`${MONTHS[month]} ${year}`}</h4>
                    <p>{review.review}</p>
                    <div>
                      {user && review.User.id == user.id ?
                        <OpenModalButton
                            buttonText="Delete Spot"
                             modalComponent={<ReviewDeleteModel id={review.id}/>}
                        ></OpenModalButton> : null}
                    </div>
                  </div>
                )
            })}
          </div>
        </>
      )
    } else {
      if(allowReview){
        return (
          <OpenModalButton
           buttonText="Leave your review"
           onButtonClick={closeMenu}
           modalComponent={<ReviewModel
             spot={spot}
             user={user}
           />}
          />)
      } else {
        return null
      }
    }
}



export default ReviewsAllDetails;
