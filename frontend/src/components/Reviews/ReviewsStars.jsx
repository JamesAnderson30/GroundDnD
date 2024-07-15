function ReviewsStars({spot, numerical}){
    let avgRating = 0;
    if(spot.Reviews && spot.Reviews.length > 0){
        avgRating = spot.Reviews.reduce((acc, value)=> {
            return acc + value.stars;
        }, 0)

        avgRating = (Math.round((avgRating / spot.Reviews.length) * 10) / 10).toFixed(1);
    } else {
        return (
            <div>No Reviews</div>
        )
    }

    let starArray = Array(5).fill(".");
//console.log("starArray: ",starArray)
    for(let i = 0; i < starArray.length; i++){
        if(avgRating > i){
            starArray[i] = "★";
        }
    }
    //console.log("spot.Reviews: ",spot.Reviews);
    let reviewCount = spot.Reviews.length;

    if(numerical){
        return (
            <>
                <span>★{avgRating}</span>
            </>
        )
    } else {
        console.log("not numerical");
        return (
            <>
                {starArray.map((element, i)=>{
                    return (
                            <span key={`${i}${i*i}`}>{element}</span>
                        )
                    })}
                    <span>
                    &nbsp;.&nbsp;{`${reviewCount} review`}{(reviewCount === 1) ? "" : "s"}
                    </span>
            </>
        )
    }
}

export default ReviewsStars;
