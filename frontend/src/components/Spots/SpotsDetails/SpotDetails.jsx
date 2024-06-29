import { useParams } from "react-router-dom";
import SpotBasicInfo from "../SpotBasicDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSpot } from "../../../store/spots";



//---
//Components


//---
// Images
//import testImg from "../../../.././../images/testImg.png";



function SpotDetails (){
    const {id} = useParams()
    const dispatch = useDispatch();

    useEffect(()=>{

      dispatch(fetchSpot(id))
    }, [dispatch,id])

    return (
      <>
        <div id={"SpotDetailsContainer"}>
          <SpotBasicInfo id={id}/>
        </div>

        <div style={{backgroundColor:"yellow"}}>Imgs</div>
      </>
    )
}

export default SpotDetails;


/*
<div id={"SpotGallery"}>
          <img src={testImg}/>
        </div>
*/
