import { Link } from 'react-router-dom';
import logo from '../images/whitelogo.png';
import colorLogo from '../images/colorlogo.png';

export default function Nav({
  authToken,
  minimal,
  setShowModal,
  showModal,
  setIsSignUp,
}) {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? colorLogo : logo} />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
      {/* <Link to="/dashboard">Dashboard</Link>
      <Link to="/onboarding">Boarding</Link> */}
    </nav>
  );
}
