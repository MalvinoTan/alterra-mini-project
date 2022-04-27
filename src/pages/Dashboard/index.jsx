import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Bootstrap Components */
import { Spinner, Modal } from "react-bootstrap";

/** Styles */
import styles from "./style.module.css";

/** Queries */
import { GET_TEAMS } from "../../GraphQL/Teams/queries";

const Dashboard = () => {

    const navigate = useNavigate();

    const [getTeams, { data, loading, error, refetch }] = useLazyQuery(GET_TEAMS);

    useEffect(() => {
        getTeams();
    }, []);

    const handleClick = (id) => {
        navigate(`/dashboard/${id}`);
    }

    return (
        <div className={styles.dashboard_container}>
            <h2>Team List</h2>
            {
                loading ?
                    <Spinner animation="border" variant="light" className={styles.spinner} />
                    :
                    !loading && data ?
                        data.teams.length !== 0 ?
                            data.teams.map((team, teamIdx) => (
                                <div className={styles.team} key={teamIdx} onClick={() => handleClick(team.id)}>
                                    <h4>{team.teamName}<span className={styles.hidden}> - {team.university}</span></h4>
                                    <h4 className={styles.hidden}><span>&gt;</span></h4>
                                </div>
                            ))
                            :
                            <p>Belum ada tim yang terdaftar...</p>
                        :
                        <p>Terdapat Error: {error}</p>
            }

            <button type="button">Tambah Tim</button>
        </div>
    );
};

export default Dashboard;