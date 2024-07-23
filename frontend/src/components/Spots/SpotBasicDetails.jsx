//import { useParams } from "react-router-dom";

function SpotBasicInfo ({spot}){
    //const {spotId} = useParams()
    ////console.log("spot: ", spot);
    let {name, city, state, country} = spot;
    return (
        <div>
            <h2>{name}</h2>
            <h3>{`${city}, ${state}, ${country}`}</h3>
        </div>
    )
}

export default SpotBasicInfo;
