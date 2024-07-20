import { useEffect, useState } from "react";
import "./ReviewModel.css";
import { postReview } from "../../../store/reviews";
import { useModal } from '../../../context/Modal';
import { useDispatch } from "react-redux";
function ReviewModel({spot, user}){
    const [disabled, setDisabled] = useState(true);
    const [review, setReview] = useState("");
    const STAR = "/images/star.png";
    const NO_STAR = "/images/nostar.png";
    const [stars, setStars] = useState([NO_STAR, NO_STAR, NO_STAR, NO_STAR, NO_STAR]);
    const [starCount, setStarCount] = useState(0);

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    function handleStartClick(e){
        //let i = e.target.id.subStr(e.target.id.length - 1);
        let id = e.target.id;
        let i = id.substr(id.length - 1);
        let newState = [];



        for(let k = 0; stars.length > k; k++){
            if(k <= i){
                newState.push(STAR);
            } else {
                newState.push(NO_STAR);
            }
        }

        setStars(newState);
        setStarCount(parseInt(i) + 1);
    }

    function handleButtonClick(){
        let payload = {
            spotId: spot.id,
            userId: user.id,
            review,
            stars: starCount
        }
        console.log("payload: ", payload);
        return dispatch(postReview(payload))
            .then(closeModal)
            .catch(async (res) => {
                // const data = await res.json();
                // if (data && data.errors) {
                // setErrors(data.errors);
                // }
        });
    }

    useEffect(()=>{
        if(disabled == false && (starCount < 1 || review.length < 10)){
            setDisabled(true);
        } else if(disabled == true && (starCount >= 1 && review.length >= 10)){
            setDisabled(false);
        }
    }, [disabled, starCount, review, setDisabled]);



    return (
        <div id="ReviewModel">
            <h2>How was your stay?</h2>
            <textarea className="reviewTextarea" value={review} onChange={(e)=>{setReview(e.target.value)}}></textarea>
            <div id="StarGallery">
                <img id="star0" className="reviewStar" src={stars[0]} onMouseEnter={(e)=>{e.target.src = "/images/star.png"}} onMouseLeave={(e)=>{e.target.src = stars[0]}} onClick={(e)=>{handleStartClick(e)}} />
                <img id="star1" className="reviewStar" src={stars[1]} onMouseEnter={(e)=>{e.target.src = "/images/star.png"}} onMouseLeave={(e)=>{e.target.src = stars[1]}} onClick={(e)=>{handleStartClick(e)}} />
                <img id="star2" className="reviewStar" src={stars[2]} onMouseEnter={(e)=>{e.target.src = "/images/star.png"}} onMouseLeave={(e)=>{e.target.src = stars[2]}} onClick={(e)=>{handleStartClick(e)}} />
                <img id="star3" className="reviewStar" src={stars[3]} onMouseEnter={(e)=>{e.target.src = "/images/star.png"}} onMouseLeave={(e)=>{e.target.src = stars[3]}} onClick={(e)=>{handleStartClick(e)}} />
                <img id="star4" className="reviewStar" src={stars[4]} onMouseEnter={(e)=>{e.target.src = "/images/star.png"}} onMouseLeave={(e)=>{e.target.src = stars[4]}} onClick={(e)=>{handleStartClick(e)}} />
                 Stars
            </div>
            <button disabled={disabled} onClick={(e)=>{handleButtonClick(e)}}>Submit Your Review</button>
        </div>
    )
}

export default ReviewModel;
