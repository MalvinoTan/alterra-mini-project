import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Swal from "sweetalert2";

/** Bootstrap Components */
import { Spinner } from "react-bootstrap";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Form from "../../components/Form";
import Header from "../../components/Header";

/** Queries */
import { INSERT_USER } from "../../GraphQL/Users/queries";

const Register = (params) => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([
        {
            label: "Username",
            name: "username",
            type: "text",
            value: "",
            placeholder: "Masukkan Username",
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            value: "",
            placeholder: "Masukkan Password",
        },
        {
            label: "Email",
            name: "email",
            type: "email",
            value: "",
            placeholder: "Masukkan Email",
        },
        {
            label: "No Handphone",
            name: "noHandphone",
            type: "text",
            value: "",
            placeholder: "Masukkan Nomor Handphone",
        },
    ]);

    const [insertUser, { data, loading, error }] = useMutation(INSERT_USER, {
        onCompleted: (data) => {
            Swal.fire(
                'Register Berhasil!',
                'Akun anda sudah terdaftar.',
                'success'
            )

            navigate("/login");
        },
        onError: (error) => {
            Swal.fire(
                'Register Gagal!',
                'Username sudah pernah ada.',
                'error'
            )
        }
    })

    const handleSubmit = (e) => {

        e.preventDefault();

        insertUser({
            variables: {
                username: inputs[0].value,
                password: inputs[1].value,
                email: inputs[2].value,
                noHandphone: inputs[3].value,
            }
        })

        setInputs([...inputs], inputs[0].value = "", inputs[1].value = "", inputs[2].value = "", inputs[3].value = "");
    }

    return (
        <>
            <Header />
            <div className={styles.register_container}>
                <h2>Register</h2>
                {
                    loading ?
                        <Spinner animation="border" variant="light" className={styles.spinner} />
                        :
                        <></>
                }
                <Form inputs={inputs} setInputs={setInputs} buttonText="Register" handleSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default Register;