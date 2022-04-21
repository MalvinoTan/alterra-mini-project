import { Route, Routes } from 'react-router-dom';

/** Style */
import './App.css';

/** Components */
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
