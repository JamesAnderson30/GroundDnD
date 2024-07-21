import ReviewsStars from "../../Reviews/ReviewsStars";

function SpotCallToAction({spot}){
    //console.log("call to action: ", spot);

    // --- Set avg Rating

    function handleReserve(){
        alert("Feature coming soon");
    }
    let {price} = spot;

    return (
        <div id="spotCallToAction">
            <div id={"spotCallToActionTopRow"}>
                <span>
                    <span id="callToActionPrice">
                            ${price}
                        </span>
                        <span id="callToActionNight"> night</span>
                </span>
                <span>
                    <ReviewsStars spot={spot}/>
                </span>
            </div>
            {/* Button */}
            <div id="SpotCallToActionButton">
                <button onClick={handleReserve}>Reserve</button>
            </div>
        </div>
    )
}

export default SpotCallToAction;
