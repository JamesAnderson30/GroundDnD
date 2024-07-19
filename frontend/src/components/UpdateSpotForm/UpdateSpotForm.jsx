import {useEffect, useState} from 'react';
import { csrfFetch } from '../../store/csrf';
import { useDispatch, useSelector } from 'react-redux';
import { postSpot, fetchSpot } from '../../store/spots';
import ErrorLabel from '../Error/ErrorLabel';
import { useParams, useNavigate } from 'react-router-dom';

import './UpdateSpotForm.css';

function UpdateSpotForm(){
    let [country, setCountry] = useState("");
    let [address, setAddress] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [lat, setLat] = useState("");
    let [long, setLong] = useState("");
    let [description, setDescription] = useState("");
    let [title,setTitle] = useState("");
    let [preview, setPreview] = useState("");
    let [image1, setImage1] = useState(false);
    let [image2, setImage2] = useState(false);
    let [image3, setImage3] = useState(false);
    let [image4, setImage4] = useState(false);
    let [price, setPrice] = useState("");
    let [isLoaded, setLoaded] = useState(false);
    let [errors, setErrors] = useState({});
    let [handleErrors, setHandleErrors] = useState("");

    const dispatch = useDispatch();
    const {id} = useParams()
    const user = useSelector(state => state.session.user);
    let userClone = user;
    let {spots} = useSelector(state=>state.spots);

    const navigate = useNavigate();

    //Error Handling: user not logged in



    useEffect(()=>{
        //If the spot doesn't exist in state

        //Error Handling: user not logged in



        if(!(spots && spots.byId[id])){
            console.log("dispatch...");
            dispatch(fetchSpot(id));
            setLoaded(true);
        } else {
            let spot = spots.byId[id];
            console.log("user: ", JSON.stringify(user));
            console.log("user.id", JSON.stringify(user.id));
            console.log("spot.User.id: ", spot.User.id);

            if(!user){
                setHandleErrors("User must be logged in");
                console.log("not logged");
            } else if(user.id !== spot.User.id){
                setHandleErrors("You must own the spot to update it");
                console.log("not right user");
            } else {

                setCountry(spot.country)
                setAddress(spot.address);
                setCity(spot.city);
                setState(spot.state);
                setLat(spot.lat);
                setLong(spot.lng);
                setDescription(spot.description);
                setTitle(spot.name);
                setPrice(spot.price);

                let i = 0;
                for(let image of spot.Images){
                    if(image.preview){
                        setPreview(image);
                    } else {
                        switch(i){
                            case 1:
                                setImage1(image);
                                break;
                            case 2:
                                setImage2(image);
                                break;
                            case 3:
                                setImage3(image);
                                break;
                            case 4:
                                setImage4(image);
                                break;
                            default:
                                break;
                        }
                    }
                    i++;
                }
            }

        }
    }, [dispatch, id, spots, user, setHandleErrors])


    if(handleErrors){
        console.log(handleErrors);
        return(
            <>
                <div>{handleErrors}</div>
            </>
        )
    }




    let handleDemo = (e) => {
        e.preventDefault();
        setCountry("Demo");
        setAddress("Test Rd");
        setCity("Demo City");
        setState("Test State");
        setLat(50);
        setLong(40);
        setPrice(800);
        setDescription("This is a demo spot, used to help speed up filling out forms! Repeat line! This is a demo spot, used to help speed up filling out forms! Repeat line! This is a demo spot, used to help speed up filling out forms! Repeat line! This is a demo spot, used to help speed up filling out forms! Repeat line! This is a demo spot, used to help speed up filling out forms! Repeat line!")
        setTitle("Demo Spot");
        setPreview("https://stonewood.co.nz/wp-content/uploads/Azure-106-Gable.jpg");
        setImage1("https://i0.wp.com/ceciliamoyerblog.com/wp-content/uploads/2020/07/dark-exterior-house-black-exterior-6.png?resize=775%2C775&ssl=1");
        setImage2("https://s3.amazonaws.com/homestratosphere/wp-content/uploads/2016/06/07101532/3ad-bungalow.jpg");
        setImage3("https://2.bp.blogspot.com/-jOS8_wnKkqk/Umas0EW11dI/AAAAAAAA4Jo/wr0wCIBD57I/s1600/beautiful-houses-with-beautiful-gardens.jpg");
        setImage4("https://www.mashvisor.com/blog/wp-content/uploads/2018/09/bigstock-Cozy-house-with-beautiful-land-84075557.jpg");
    }

    //Component Functions

    let handleSubmit = async (e) => {
        e.preventDefault();

        let body = JSON.stringify({
            country, address, city, state, lat, lng: long,
            description, name: title, price
        });

        let images = {preview, image1, image2, image3, image4};
        //A response of  'false' means a successful post
        //A truthy response means the server returned an error message
        let response = await dispatch(postSpot(body, images));

        if(response.errors){
            let copy = {...response};
            setErrors(copy.errors);
        } else {
            navigate(`/spots/${response}`)
        }


    }



    return (
        <div id="NewSpotForm">
            <h2>Update my Spot</h2>
            <h3>Where's your place located?</h3>
            Guests will only get your exact address once they booked a
            reservation.
            <br/>
            <br/>
            <form id="NewSpotForm">
                <div>
                    <label htmlFor="country">Country</label><ErrorLabel error={errors.country} />
                    <input name="country" value={country} placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label><ErrorLabel error={errors.address} />
                    <input name="address" value={address} placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}></input>
                </div>
                <div>
                    <div className={"labelGroup"}>
                        <label htmlFor="city">City</label><ErrorLabel error={errors.city}/>
                        <label htmlFor="state">State</label><ErrorLabel error={errors.state}/>
                    </div>
                    <div className={"inputGroup"}>
                        <input name="city" value={city} placeholder="City" onChange={(e)=>{setCity(e.target.value)}}></input>
                        <span className="comma">,</span>
                        <input name="state" value={state} placeholder="State" onChange={(e)=>{setState(e.target.value)}}></input>
                    </div>

                </div>
                <div>
                    <div className={"labelGroup2"}>
                        <label htmlFor="lat">Latitude</label><ErrorLabel error={errors.lat}/>
                        <label htmlFor="long">Longitude</label><ErrorLabel error={errors.lng}/>
                    </div>

                    <div className={"inputGroup2"}>
                        <input name="lat" value={lat} placeholder="Latitude" onChange={(e)=>{setLat(e.target.value)}}></input>
                        <span className="comma">,</span>
                        <input name="long" value={long} placeholder="Longitude" onChange={(e)=>{setLong(e.target.value)}} />
                    </div>
                </div>

                <div>
                    <hr/>
                    <h3>Describe your place to guests</h3>
                    Mention the best features of your space, any special amentities like
                    fast wif or parking, and what you love about the neighborhood.
                    <ErrorLabel error={errors.description}/>
                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                </div>
                <div>
                    <hr/>
                    <h3>Create a title for your spot</h3>
                    Catch guests&apos; attention with a spot title that highlights what makes
                    your place special.

                    <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    <ErrorLabel error={errors.name}/>
                </div>
                <hr/>
                <div>
                    <h3>Set a base price for your spot</h3>
                    Competitive pricing can help your listing stand out and rank higher
                    in search results
                    <label  htmlFor="price">Price"</label><ErrorLabel error={errors.price}/>
                    <h3 className="comma">$</h3><input name="price" id="price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
                </div>
                <hr/>
                <div>
                    <h3>Liven up your spot with photos</h3>
                    Submit a link to at least one photo to publish your spot
                    <input value={preview} onChange={(e)=>{setPreview(e.target.value)}} placeholder='Preview Image URL' />
                    <input className="imageInput" value={(image1) ? image1 : ""} onChange={(e)=>{setImage1(e.target.value)}} placeholder="Image URL" />
                    <input className="imageInput" value={(image2) ? image1 : ""} onChange={(e)=>{setImage2(e.target.value)}} placeholder="Image URL" />
                    <input className="imageInput" value={(image3) ? image1 : ""} onChange={(e)=>{setImage3(e.target.value)}} placeholder="Image URL" />
                    <input className="imageInput" value={(image4) ? image1 : ""} onChange={(e)=>{setImage4(e.target.value)}} placeholder="Image URL" />
                </div>
                <hr/>
                <button type='submit' onClick={(e)=>handleSubmit(e)}>Update Spot</button>
            </form>
            <button onClick={(e)=>{handleDemo(e)}}>Demo</button>
        </div>
    )
}

export default UpdateSpotForm;
/*country
address
city
state
lat
long
description
title
preview
4 images*/
