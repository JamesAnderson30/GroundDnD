function ReviewsStars({spot}){
    let avgRating = 0;
    if(spot.Reviews.length > 0){
        avgRating = spot.Reviews.reduce((acc, value)=> {
            return acc + value.stars;
        }, 0)

        avgRating = avgRating / spot.Reviews.length;
    }

    let starArray = Array(5).fill(".");

    for(let i = 0; i < starArray.length; i++){
        if(avgRating > i){
            starArray[i] = "*";
        }
    }

    let reviewCount = spot.Reviews.length;

    return (
        <>
            {starArray.map((element, i)=>{
                return (
                        <span key={`${i}${i*i}`}>{element}</span>
                    )
                })}
                &nbsp;
                <span>
                    {`${reviewCount} reviews`}
                </span>
        </>
    )
}

export default ReviewsStars;
