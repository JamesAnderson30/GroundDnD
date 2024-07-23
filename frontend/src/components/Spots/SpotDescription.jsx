//import { useSelector } from "react-redux";

function SpotDescription({spot}){

    if(!spot){
        return (
            <div>No Description</div>
        )
    } else {
        const {firstName, lastName} = spot.User;
        ////console.log("test: ", spot.User)
        const {description} = spot;
        return (
            <div className="SpotDescription">
                <h2>Hosted by {firstName} {lastName}</h2>
                <p>{description}</p>
            </div>
        )
    }


}

export default SpotDescription;
