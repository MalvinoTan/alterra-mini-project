import { Link } from "react-router-dom";

/** Images */
import logo from "../../assets/img/logo.png"

/** Styles */
import styles from "./style.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <img src={logo} alt="LOGO" />
                <span>MComp 2022</span>
            </h1>
            <nav className={styles.nav}>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/about">About</Link>
                <Link to="/">Login</Link>
            </nav>
        </header>
    );
};

export default Header;