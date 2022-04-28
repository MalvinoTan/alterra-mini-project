import { Link } from "react-router-dom";

/** Images */
import logo from "../../assets/img/logo.png"

/** Styles */
import styles from "./style.module.css";

const Header = () => {

    const dataUser = JSON.parse(localStorage.getItem("token"))

    console.log(dataUser)

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <img src={logo} alt="LOGO" />
                <span>MComp 2022</span>
            </h1>
            <nav className={styles.nav}>
                <Link to="/">Home</Link>
                <Link to="/dashboard" className={dataUser === null ? styles.hidden : null}>Dashboard</Link>
                <Link to="/about">About</Link>
                {
                    dataUser === null ?
                        <Link to="/login">Login</Link>
                        :
                        <Link to="/logout">Logout</Link>
                }
            </nav>
        </header>
    );
};

export default Header;