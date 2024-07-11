import ReviewsStars from '../Reviews/ReviewsStars';
import './SpotGridItem.css'

function SpotGridItem({spot, idx}){
    let thisSpot = spot.spot
    console.log("thisSpot: ", thisSpot);
    return(
        <a href={`/spots/${thisSpot.id}`}>
            <div className={"SpotGridItem"}>
                <div className="SpotGridImg">
                    <img src={thisSpot.previewImage}></img>
                </div>
                <div className="SpotGridBottom">
                    <div className={"SpotGridInformation"}>
                        <div className="SpotGridLocation">
                            {thisSpot.city},{thisSpot.state}
                        </div>
                        <div className="SpotGridStars">
                            <ReviewsStars numerical={true}spot={thisSpot}/>
                        </div>
                    </div>
                    <div className={"SpotGridPrice"}>
                        $<h4>{thisSpot.price}</h4> night
                    </div>
                </div>
            </div>
        </a>
    )
}

export default SpotGridItem;
