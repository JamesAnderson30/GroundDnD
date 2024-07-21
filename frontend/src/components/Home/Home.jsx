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
  console.log("loadedAll: ", loadedAll);
  useEffect(()=>{
      dispatch(fetchAllSpots());
  }, [loadedAll, dispatch])



  return(
    <>
      <h1>home</h1>
      <div id="SpotList">
      {spots.all.map((spot, idx)=>{
        return (
          <span key={idx}>
          <SpotGridItem spot={{spot,idx}}/>
          </span>
        )
      })}
      </div>
    </>
  )
}

export default Home;
