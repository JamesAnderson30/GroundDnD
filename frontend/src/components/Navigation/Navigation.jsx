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
          <NavLink to="/" ><img className="pointer" src="/frontend/images/logo.png"></img></NavLink>
        </div>
        <div className='floatRight'>
            <ul id="navList">
              {isLoaded && (
                <>
                <li>
                  {sessionUser && (<NavLink to="/spots/new">Create New Spot</NavLink>)}
                </li>
                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              </>
              )}
            </ul>
        </div>
      </nav>
      <hr id="NavigationHR"/>
    </>
  );
}

export default Navigation;
