import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useModal } from '../../context/Modal';
function DeleteSpotModel({id}){
    const {closeModal} = useModal();

    let dispatch = useDispatch();
    function handleDelete(e){

        e.preventDefault();
        e.stopPropagation();
        console.log("delete");
        dispatch(deleteSpot(id)).then(closeModal)
        .catch(async () => {
        //   const data = await res.json();
        //   if (data && data.errors) {
        //     setErrors(data.errors);
        //   }
        });

    }

    function handleClose(){
        closeModal();
    }

    return (
        <>
            <h2>Confirm Delete</h2>
            <div id="DeleteSecondParagraph">Are you sure you want to remove this spot from the listings?</div>
            <button  onClick={(e)=>{handleDelete(e)}}id="DeleteYes">Yes (Delete Spot)</button>
            <button onClick={(e)=>{handleClose(e)}}id="DeleteNo">No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModel;
