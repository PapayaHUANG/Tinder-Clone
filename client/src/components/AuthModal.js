import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { createAccount, logIn } from '../utils/crud';

export default function AuthModal({ setShowModal, isSignUp }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords need to match!');
      return;
    }
    try {
      if (isSignUp) {
        const response = await createAccount(email, password);

        setCookie('AuthToken', response.data.token);
        setCookie('UserId', response.data.userId);
        const success = response.status === 201;
        const failed = response.status === 400;
        if (success && isSignUp) navigate('/onboarding');
        if (success && !isSignUp) navigate('/dashboard');
      } else {
        const response = await logIn(email, password);
        setCookie('AuthToken', response.data.token);
        setCookie('UserId', response.data.userId);
        const success = response.status === 201;
        if (success && isSignUp) navigate('/onboarding');
        if (success && !isSignUp) navigate('/dashboard');
      }
      window.location.reload();
    } catch (error) {
      setError('User Already Exist!');
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ✖
      </div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>Policies in regards of clicking.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
}
