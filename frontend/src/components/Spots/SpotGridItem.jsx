import { NavLink } from 'react-router-dom';
import ReviewsStars from '../Reviews/ReviewsStars';
import './SpotGridItem.css'

import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { useState, useEffect, useRef } from 'react';
import DeleteSpotModel from '../DeleteSpotModel/DeleteSpotModel';

function SpotGridItem({spot, idx, manage = false}){


    // function handleDelete(e){
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dispatch(deleteSpot(e.target.value));
    // }


        // -------------- MODEL STUFF ----------------------//
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    // let closeButton = document.getElementById("DeleteNo");

    // const toggleMenu = (e) => {
    //     e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    //     setShowMenu(!showMenu);

    // };

    useEffect(() => {
        //console.log("useEffect showMenu: ", showMenu);
        if (!showMenu) return;

        const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);



    // ----------------------------------------------------------//


    //*when you get back, make delete model*//

    if(!manage){
        let thisSpot = spot.spot
        return(
            <span title={thisSpot.name} key={`aa${idx}`}>
            <a className="pointer" href={`/spots/${thisSpot.id}`}>
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
        </span>
        )
    } else {

        return(
            <a>
                <div className={"SpotGridItem"}>
                    <NavLink to={`/spots/${spot.id}`}>
                        <div className="SpotGridImg">
                            <img src={spot.previewImage}></img>
                        </div>
                        <div className="SpotGridBottom">
                            <div className={"SpotGridInformation"}>
                                <div className="SpotGridLocation">
                                    {spot.city},{spot.state}
                                </div>
                                <div className="SpotGridStars">
                                    <ReviewsStars numerical={true}spot={spot}/>
                                </div>
                            </div>
                            <div className={"SpotGridPrice"}>
                                $<h4>{spot.price}</h4> night
                            </div>
                        </div>
                    </NavLink>
                    <div className="ManageDiv">
                        <NavLink className={"ManageButton"} to={`/spots/${spot.id}/update`}><button>Manage Spot</button></NavLink>
                        <OpenModalButton
                            buttonText="Delete Spot"
                             modalComponent={<DeleteSpotModel id={spot.id}/>}
                        ></OpenModalButton>
                    </div>
                </div>
            </a>
        )
    }
}

export default SpotGridItem;
