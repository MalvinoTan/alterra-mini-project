import { Route, Routes } from "react-router-dom";

/** Style */
import "./App.css";

/** Components */
import Header from "./components/Header";
import Footer from "./components/Footer";

/** Pages */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import TeamData from "./pages/TeamData";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <div className="app_container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id" element={<TeamData />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
