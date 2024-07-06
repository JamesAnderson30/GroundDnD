import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <nav id="MainNav">
        <div className='floatLeft'>
          <img src="/images/logo.png"></img>
        </div>
        <div className='floatRight'>
            <NavLink to="/spots/1">/spots/1</NavLink>
            <NavLink to="/spots/2">/spots/2</NavLink>
            <NavLink to="/spots/3">/spots/3</NavLink>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {isLoaded && (
                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              )}
            </ul>
        </div>
      </nav>
      <hr id="NavigationHR"/>
    </>
  );
}

export default Navigation;
