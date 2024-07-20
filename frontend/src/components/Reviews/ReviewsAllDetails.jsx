import { useSelector } from "react-redux";
import './Review.css'
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchReviewsBySpot } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewModel from "./ReviewModel/ReviewModel";




function ReviewsAllDetails({id, spot}){
    const allReviews = useSelector(state=>state.reviews.reviews.all);
    const byId = useSelector(state=>state.reviews.reviews.byId);
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    /* MODEL */

      const [showMenu, setShowMenu] = useState(false);
      const ulRef = useRef();

      const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };

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


    function checkState(spotReviews){

    }

    //I need to figure this out, refractor

    useEffect(()=>{
      if(!checkState(spot.Reviews) && user){

        dispatch(fetchReviewsBySpot(id));
      }

    }, [dispatch,id, spot])


    console.log("spot.Reviews.length: ", spot.Reviews.length);
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
              console.log("byIdTEST: ", byId);
              let d = new Date(Date.parse(review.updatedAt));

              let month = d.getUTCMonth();
              let year = d.getUTCFullYear();
                return (
                  <div className={"SingleReview"} key={i}>
                    <h3>{review.User.firstName}</h3>
                    <h4>{`${MONTHS[month]} ${year}`}</h4>
                    <p>{review.review}</p>
                  </div>
                )
            })}
          </div>
        </>
      )
    } else {
      console.log("allowReview: ", allowReview);
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
        return(
          <div>No Reviews</div>
        )
      }
    }
}



export default ReviewsAllDetails;
