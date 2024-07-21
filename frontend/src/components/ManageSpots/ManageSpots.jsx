import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpots } from "../../store/spots";
import SpotGridItem from "../Spots/SpotGridItem";
import { NavLink } from "react-router-dom";
function ManageSpots(){
    const user = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [handleError, setHandleError] = useState("");
    const dispatch = useDispatch();
    let {userSpots} = useSelector(state=>state.spots);
    console.log(handleError)

    useEffect(()=>{
        if(user){
            if(isLoaded == false){
                dispatch(fetchUserSpots(user.id));
                setIsLoaded(true);
            }
        } else {
            setHandleError("Please Log In");
        }
    }, [isLoaded, dispatch, user, setHandleError, setIsLoaded])

    if(isLoaded){
        if(userSpots && userSpots.length > 1){
            return(
                <>
                    <NavLink to="/spots/new" ><button>Create a new Spot</button></NavLink>
                    {userSpots.map((spot, idx)=>{
                        return(
                            <span key={idx}>
                                <SpotGridItem manage={true} spot={spot} />
                            </span>
                        )
                    })}
                </>
            )
        } else {
            return(
                <>
                    <NavLink to="/spots/new" ><button>Create a new Spot</button></NavLink>
                    <div>No spots, add one today!</div>
                </>
            )
        }
    }
}
export default ManageSpots;
