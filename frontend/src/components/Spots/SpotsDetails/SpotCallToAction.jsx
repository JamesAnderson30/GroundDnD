function SpotCallToAction({spot}){
    //console.log("call to action: ", spot);

    // --- Set avg Rating
    let avgRating = 0;
    if(spot.Reviews.length > 0){
        avgRating = spot.Reviews.reduce((acc, value)=> {
            return acc + value.stars;
        }, 0)

        avgRating = avgRating / spot.Reviews.length;
    }

    let reviewCount = spot.Reviews.length;

    let {price} = spot;

    return (
        <div>
            Average Rating: {avgRating}
            Price: {price}
            Review Count: {reviewCount}
        </div>
    )
}

export default SpotCallToAction;
