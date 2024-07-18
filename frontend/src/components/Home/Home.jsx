import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import SpotGridItem from "../Spots/SpotGridItem";

import './Home.css';

//components


function Home(){

  let {spots} = useSelector(state=>state.spots);
  let {loadedAll} = spots;
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!loadedAll){
      dispatch(fetchAllSpots());
    } else {
    }
  }, [loadedAll, dispatch])



  return(
    <>
      <h1>home</h1>
      <div id="SpotList">
      {spots.all.map((spot, idx)=>{
        return (
          <SpotGridItem spot={{spot,idx}}/>
        )
      })}
      </div>
    </>
  )
}

export default Home;
