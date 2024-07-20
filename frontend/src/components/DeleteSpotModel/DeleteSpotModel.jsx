import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useState } from "react";
import { useModal } from '../../context/Modal';
function DeleteSpotModel({id, toggleMenu}){
    const [closeMe, setCloseMe] = useState(false);
    const {closeModal} = useModal();

    let dispatch = useDispatch();
    function handleDelete(e){
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteSpot(id)).then(closeModal)
        .catch(async (res) => {
        //   const data = await res.json();
        //   if (data && data.errors) {
        //     setErrors(data.errors);
        //   }
        });

    }

    function handleClose(e){
        closeModal();
    }

    return (
        <>
            <h2>Confirm Delete</h2>
            <div id="DeleteSecondParagraph">Are you sure you want to remove this spot from the listings?</div>
            <button onClick={(e)=>{handleDelete(e)}} id="DeleteYes">Yes (Delete Spot)</button>
            <button onClick={(e)=>{handleClose(e)}}id="DeleteNo">No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModel;
