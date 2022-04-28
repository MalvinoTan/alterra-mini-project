/** Styles */
import styles from "./style.module.css";

/** Components */
import Header from "../../components/Header";

const Logout = () => {

    localStorage.removeItem("token");

    return (
        <>
            <Header />
            <h2 className={styles.logout}>You have logged out</h2>
        </>
    );
};

export default Logout;