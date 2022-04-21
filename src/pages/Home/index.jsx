import { Link } from "react-router-dom";

/** Images */
import alterra_logo from "../../assets/img/alterra.png";
import mikroskil_logo from "../../assets/img/mikroskil.png";

/** Styles */
import styles from "./style.module.css";

const Home = () => {

    const timeline = [
        {
            title: "Pendaftaran",
            date: "20 April 2022 - 15 Mei 2022",
        },
        {
            title: "Penyisihan",
            date: "22 Mei 2022",
        },
        {
            title: "Pengumuman Finalis",
            date: "29 Mei 2022",
        },
        {
            title: "Final",
            date: "7 Juni 2022",
        },
        {
            title: "Pengumuman Pemenang",
            date: "14 Juni 2022",
        },
    ];

    return (
        <div className={styles.home_container}>
            <h1>MCOMP 2022<br />GUITAR DUO COMPETITION</h1>

            <div className={styles.button_container}>
                <button type="button"><a href="#" download>Guidebook</a></button>
                <button type="button" className={styles.btn_daftar}><Link to="/dashboard">Daftar</Link></button>
            </div>

            <p><b>Biaya Pendaftaran:</b><br />Rp 50.000</p>

            <div className={styles.content_container}>
                <h2>About MComp 2022</h2>
                <p>
                    MComp 2022 merupakan kompetisi gitar duo untuk mahasiswa S1 yang diselenggarakan oleh Malvino Austin Tanura berskala nasional.
                </p>
                <button type="button" className={styles.btn_daftar}><Link to="/dashboard">See More &gt;</Link></button>
            </div>

            <div className={styles.content_container}>
                <h2>Timeline</h2>
                {
                    timeline.map((item, itemIdx) => (
                        <p key={itemIdx}><b>{item.title}</b><br />{item.date}</p>
                    ))
                }
            </div>

            <div className={styles.media_partner}>
                <h2>Media Partner</h2>
                <img src={alterra_logo} alt="Alterra Logo" />
                <img src={mikroskil_logo} alt="Mikroskil Logo" />
            </div>

        </div>
    );
};

export default Home;