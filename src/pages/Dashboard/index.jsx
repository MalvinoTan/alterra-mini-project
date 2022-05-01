import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

/** Bootstrap Components */
import { Spinner } from "react-bootstrap";

/** Components */
import Header from "../../components/Header";

/** Styles */
import styles from "./style.module.css";

/** Queries */
import { GET_TEAMS_FOR_COACH, GET_TEAMS_FOR_ADMIN, UPDATE_TEAM_STATUS } from "../../GraphQL/Teams/queries";

const Dashboard = () => {

    const navigate = useNavigate();

    const [getTeamsForCoach, { data, loading, error, refetch }] = useLazyQuery(GET_TEAMS_FOR_COACH);

    const [getTeamsForAdmin, { data: dataTeamsAdmin, loading: loadingTeamsAdmin, error: errorTeamsAdmin, refetch: refetchTeamsAdmin }] = useLazyQuery(GET_TEAMS_FOR_ADMIN);

    const [updateTeamStatus, { loading: loadingUpdateStatus }] = useMutation(UPDATE_TEAM_STATUS, {
        onCompleted: (data) => {
            Swal.fire(
                'Update Berhasil',
                'Status berhasil diupdate.',
                'success'
            )
        },
        onError: (error) => {
            console.log(error);
            alert("Ada Error!!!");
        }
    });

    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

    useEffect(() => {

        refetch();

        refetchTeamsAdmin();

        if (token !== null) {
            if (token.role === "admin") {
                getTeamsForAdmin();
            }
            else {
                getTeamsForCoach({
                    variables: {
                        id: token.id
                    }
                });
            }
        }
        else {
            navigate("/login");
        }
    }, []);

    const handleClick = (id) => {
        navigate(`${id}`);
    }

    const handleAdd = () => {
        navigate("add-team");
    }

    const handleStatus = (id, status) => {
        updateTeamStatus({
            variables: {
                id,
                status,
            }
        })
    }

    return (
        <>
            <Header />
            <div className={styles.dashboard_container}>
                <div className={styles.profile}>
                    <h3>{token.username}</h3>
                    <p>Role : {token.role}</p>
                    <p>Email : {token.email}</p>
                    <p>No Handphone : {token.noHandphone}</p>
                </div>
                <h2>Team List</h2>
                {
                    loading || loadingTeamsAdmin || loadingUpdateStatus ?
                        <Spinner animation="border" variant="light" className={styles.spinner} />
                        :
                        !loading && data && token.role === "coach" ?
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
                            !loadingTeamsAdmin && dataTeamsAdmin && token.role === "admin" ?
                                dataTeamsAdmin.teams.length !== 0 ?
                                    dataTeamsAdmin.teams.map((team, teamIdx) => (
                                        <div key={teamIdx}>
                                            <div className={styles.team} onClick={() => handleClick(team.id)}>
                                                <h4>{team.teamName}<span className={styles.hidden}> - {team.university}</span></h4>
                                                <h4 className={styles.hidden}><span>&gt;</span></h4>
                                            </div>
                                            <div className={styles.btn_verif_group}>
                                                <button type="button" onClick={() => handleStatus(team.id, true)}>Verifikasi</button>
                                                <button type="button" onClick={() => handleStatus(team.id, false)}>Unverifikasi</button>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <p>Belum ada tim yang terdaftar...</p>
                                :
                                <p>Terdapat Error: {error}</p>
                }

                {
                    token.role === "coach" ?
                        <button type="button" onClick={handleAdd} className={styles.btn_add}>Tambah Tim</button>
                        :
                        <></>
                }

            </div>
        </>

    );
};

export default Dashboard;