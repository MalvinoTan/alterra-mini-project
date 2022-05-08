import { useNavigate } from "react-router-dom";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Header from "../../components/Header";

const Logout = () => {

    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/login");
    }, 500);

    localStorage.removeItem("token");

    return (
        <>
            <Header />
            <h2 className={styles.logout}>You have logged out</h2>
        </>
    );
};

export default Logout;