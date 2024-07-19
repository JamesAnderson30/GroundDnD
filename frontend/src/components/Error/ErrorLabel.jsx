function ErrorLabel({error}){
    if(error){
        return <span className="error">{error}</span>
    } else {
        return null;
    }
}

export default ErrorLabel;
