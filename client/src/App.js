import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const authToken = cookies.AuthToken;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="dashboard" element={<Dashboard />} />}
        {authToken && <Route path="onboarding" element={<Onboarding />} />}
      </Routes>
    </HashRouter>
  );
}

export default App;
