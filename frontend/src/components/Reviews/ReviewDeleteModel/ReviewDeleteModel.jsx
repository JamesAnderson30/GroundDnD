import { deleteReview } from '../../../store/reviews';
import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { fetchAllSpots } from '../../../store/spots';

function ReviewDeleteModel(id){
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    function handleDelete(e){

        e.preventDefault();
        e.stopPropagation();
        //console.log("ID!: ", id);
        dispatch(deleteReview(id.id)).then(handleClose()).then(dispatch(fetchAllSpots()))
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
            <div id="DeleteSecondParagraph">Are you sure you want to remove this review from the listings?</div>
            <button  onClick={(e)=>{handleDelete(e)}}id="DeleteYes">Yes (Delete Review)</button>
            <button onClick={(e)=>{handleClose(e)}}id="DeleteNo">No (Keep Review)</button>
        </>
    )
}

export default ReviewDeleteModel;
