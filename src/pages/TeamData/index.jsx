/** Styles */
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GET_TEAM_AND_MEMBERS_BY_ID } from "../../GraphQL/Members/queries";
import styles from "./style.module.css";

const TeamData = () => {

    const { id } = useParams();

    const { data, loading, error } = useQuery(GET_TEAM_AND_MEMBERS_BY_ID, {
        variables: {
            id
        }
    });

    return (
        <div className={styles.team_data_container}>
            {
                loading ?
                    <Spinner animation="border" variant="light" className={styles.spinner} />
                    :
                    !loading && data ?
                        <div className={styles.content_wrapper}>
                            <div className={styles.team_data}>
                                <h4><span>{data.teams[0].teamName}</span> Team</h4>

                                <p>{data.teams[0].university}</p>

                                <p className={styles.status}>Status: Belum Terverifikasi</p>

                                <p className={styles.title}>Anggota Tim</p>

                                {
                                    data.members.map((member, memberIdx) => (
                                        <div className={styles.member_container} key={memberIdx}>
                                            <p className={styles.sub_title}>Anggota {memberIdx + 1}</p>
                                            <p>Nama : {member.name}</p>
                                            <p>NIM : {member.nim}</p>
                                            <p>Email : {member.email}</p>
                                            <p>No HP : {member.noHandphone}</p>
                                        </div>
                                    ))
                                }

                                <label className={styles.title}>Upload KTM (.rar/.zip) </label>
                                <input type="file" accept=".rar,.zip" className={styles.file_input} /><br />

                                <label className={styles.title}>Upload Bukti Pembayaran (.pdf) </label>
                                <input type="file" accept=".pdf" className={styles.file_input} />

                                <button type="button" className={styles.btn_save}>Save</button>
                            </div>
                            <button type="button" className={styles.hidden}>Tambah Anggota</button>
                            <button type="button" className={styles.btn_delete}>Hapus Tim</button>
                        </div>
                        :
                        <p>Terdapat Error: {error}</p>
            }
        </div>
    );
};

export default TeamData;