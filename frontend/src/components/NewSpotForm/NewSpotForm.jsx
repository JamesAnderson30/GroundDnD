import {useState} from 'react';
import { csrfFetch } from '../../store/csrf';
import { useDispatch } from 'react-redux';
import { postSpot } from '../../store/spots';

function NewSpotForm(){
    let [country, setCountry] = useState("");
    let [address, setAddress] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [lat, setLat] = useState("0");
    let [long, setLong] = useState("0");
    let [description, setDescription] = useState("");
    let [title,setTitle] = useState("");
    let [preview, setPreview] = useState("");
    let [image1, setImage1] = useState(false);
    let [image2, setImage2] = useState(false);
    let [image3, setImage3] = useState(false);
    let [image4, setImage4] = useState(false);
    let [price, setPrice] = useState(0);

    let dispatch = useDispatch();

    //Component Functions

    let handleSubmit = (e) => {
        e.preventDefault();

        let body = JSON.stringify({
            country, address, city, state, lat, lng: long,
            description, name: title, price
        });

        let images = {preview, image1, image2, image3, image4};
        dispatch(postSpot(body, images));


    }

    return (
        <form id="NewSpotForm">
            <div>
                <label htmlFor="country">Country</label>
                <input name="country" value={country} placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input name="address" value={address} placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input name="city" value={city} placeholder="City" onChange={(e)=>{setCity(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="state">State</label>
                <input name="state" value={state} placeholder="State" onChange={(e)=>{setState(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="lat">Latitude</label>
                <input name="lat" value={lat} placeholder="Latitude" onChange={(e)=>{setLat(e.target.value)}}></input>
            </div>
            <div>
                <label htmlFor="long">Longitude</label>
                <input name="long" value={long} placeholder="Longitude" onChange={(e)=>{setLong(e.target.value)}} />
            </div>
            <div>
                <label htmlFor="price">Price"</label>
                <input name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            </div>
            <div>
                <hr/>
                <h3>Describe your place to guests</h3>
                Mention the best features of your space, any special amentities like
                fast wif or parking, and what you love about the neighborhood.
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </div>
            <div>
                <hr/>
                <h3>Create a title for your spot</h3>
                Catch guests&apos; attention with a spot title that highlights what makes
                your place special.

                <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            </div>
            <div>
                <h3>Liven up your spot with photos</h3>
                Submit a link to at least one photo to publish your spot
                <input value={preview} onChange={(e)=>{setPreview(e.target.value)}} placeholder='Preview Image URL' />
                <input value={image1} onChange={(e)=>{setImage1(e.target.value)}} placeholder="Image URL" />
                <input value={image2} onChange={(e)=>{setImage2(e.target.value)}} placeholder="Image URL" />
                <input value={image3} onChange={(e)=>{setImage3(e.target.value)}} placeholder="Image URL" />
                <input value={image4} onChange={(e)=>{setImage4(e.target.value)}} placeholder="Image URL" />
            </div>
            <hr/>
            <button type='submit' onClick={(e)=>handleSubmit(e)}>Create a Spot</button>
        </form>
    )
}

export default NewSpotForm;
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
