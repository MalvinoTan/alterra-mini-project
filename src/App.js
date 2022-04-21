import { Route, Routes } from 'react-router-dom';

/** Style */
import './App.css';

import Spinner from 'react-bootstrap/Spinner';

/** Components */
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import TeamData from './pages/TeamData';

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id" element={<TeamData />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
