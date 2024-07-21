import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../../store/spots";

//---
//Components
import SpotBasicInfo from "../SpotBasicDetails";
import SpotDescription from "../SpotDescription";
import SpotCallToAction from "./SpotCallToAction";
import ReviewsAllDetails from "../../Reviews/ReviewsAllDetails";
import SpotImgGallery from "./SpotImgGallery";
//import SpotDetailsImgs from "./SpotDetailsImgs";
//---
// Images
//import testImg from "../../../.././../images/testImg.png";
import "../Spots.css"
import ReviewsStars from "../../Reviews/ReviewsStars";



function SpotDetails (){
    const {id} = useParams()
    const dispatch = useDispatch();

    let {spots} = useSelector(state=>state.spots);

    //console.log("This is what is being passed to singleReview: ", spots.byId[id])

    //check if spot exists in state
    // If false, fetch spot
    useEffect(()=>{
      if(!spots.byId[id]) {
        dispatch(fetchSpot(id));
        //dispatch(fetchReviewsBySpot(id))
      }
    }, [dispatch, id, spots.byId])

    if(spots.byId[id]){
      //console.log("spot: ", spots.byId[id]);
      return (
        <div id={"SpotDetailsBody"}>
          <SpotBasicInfo spot={spots.byId[id]}/>
          <SpotImgGallery imgs={spots.byId[id].Images}/>
          <div id="spotDescriptionCallToAction">
            <SpotDescription spot={spots.byId[id]}/>
            <SpotCallToAction spot={spots.byId[id]}/>

          </div>
          <hr/>
          <div id="spotDetailsReviewsHeader">
            <ReviewsStars hideIfNone={true} spot={spots.byId[id]} />
          </div>
          <ReviewsAllDetails spot={spots.byId[id]} id={id}/>
        </div>
      )
    } else {
      return <h1>No spot :c</h1>
    }
}

export default SpotDetails;

//<SpotDescription spot={spots.byId[id]}/>
/*
<div id={"SpotGallery"}>
          <img src={testImg}/>
        </div>
*/
