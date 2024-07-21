import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isDisabled, setIsDisabled] = useState(true);

  function handleDemo(e){
    e.preventDefault();
    e.stopPropagation();
    setCredential("Demo-lition");
    setPassword("password");
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  useEffect(()=>{
    console.log("red.id: ", credential.length);
    console.log("pass: ", password);
    if(credential.length >= 4 && password.length >= 6) setIsDisabled(false);
    else setIsDisabled(true);
  }, [password, credential, setIsDisabled]);

  return (
    <>
      <h2>Log In</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
            className="loginInput"
          />
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />

        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div>
          <button disabled={isDisabled} type="submit">Log In</button>
        </div>
        <div>
          <button onClick={(e)=>{handleDemo(e)}}>Demo</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
