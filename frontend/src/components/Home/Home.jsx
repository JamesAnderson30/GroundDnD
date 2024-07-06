import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import SpotGridItem from "../Spots/SpotGridItem";

//components


function Home(){

  let {spots} = useSelector(state=>state.spots);
  console.log("spots all: ", spots.all);
  let {loadedAll} = spots;
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!loadedAll){
      dispatch(fetchAllSpots());
    } else {
      console.log("Spots loaded c:");
    }
  }, [loadedAll, dispatch])



  return(
    <>
      <h1>home</h1>
      {spots.all.map((spot, idx)=>{
        return (
          <SpotGridItem spot={{spot,idx}}/>
        )
      })}
    </>
  )
}

export default Home;
