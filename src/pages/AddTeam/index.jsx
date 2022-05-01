import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Swal from "sweetalert2";

/** Bootstrap Components */
import { Spinner } from "react-bootstrap";

/** Styles */
import styles from "./style.module.css";

/** Queries */
import { INSERT_TEAM } from "../../GraphQL/Teams/queries";

/** Components */
import Form from "../../components/Form";
import Header from "../../components/Header";

const AddTeam = () => {

    const navigate = useNavigate();

    const [insertTeam, { loading }] = useMutation(INSERT_TEAM, {
        onCompleted: (data) => {
            Swal.fire(
                'Berhasil!',
                'Tim berhasil ditambah.',
                'success'
            )

            navigate("/dashboard");
        },
        onError: (error) => {
            alert("Ada Error!!!");
        }
    })

    const [inputs, setInputs] = useState([
        {
            label: "Nama Tim",
            name: "namaTim",
            type: "text",
            value: "",
            placeholder: "Masukkan Nama Tim",
        },
        {
            label: "Universitas",
            name: "universitas",
            type: "text",
            value: "",
            placeholder: "Masukkan Universitas",
        },
    ]);

    const handleSubmit = (e) => {

        e.preventDefault();

        insertTeam({
            variables: {
                id_user: JSON.parse(localStorage.getItem("token")).id,
                teamName: inputs[0].value,
                university: inputs[1].value,
            }
        })

        setInputs([...inputs], inputs[0].value = "", inputs[1].value = "");


    }

    return (
        <>
            <Header />
            <Link to="/dashboard" className={styles.back}>&lt; Back to Team List</Link>
            <div className={styles.add_team_container}>
                <h2>Tambah Tim</h2>
                {
                    loading ?
                        <Spinner animation="border" variant="light" className={styles.spinner} />
                        :
                        <></>
                }
                <Form inputs={inputs} setInputs={setInputs} buttonText="Tambah" handleSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default AddTeam;