function ErrorLabel({error}){
    console.log("error: ", error);
    if(error){
        return <span className="error">{error}</span>
    } else {
        return null;
    }
}

export default ErrorLabel;
