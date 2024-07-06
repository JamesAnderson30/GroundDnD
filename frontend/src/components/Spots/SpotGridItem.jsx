import './SpotGridItem.css'

function SpotGridItem({spot, idx}){
    let thisSpot = spot.spot
    return(
        <div className={"SpotGridItem"}>
            {thisSpot.name}
        </div>
    )
}

export default SpotGridItem;
