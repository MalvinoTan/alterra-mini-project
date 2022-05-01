import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

/** Bootstrap Components */
import { Spinner } from "react-bootstrap";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Form from "../../components/Form";
import Header from "../../components/Header";

/** Queries */
import { GET_USER } from "../../GraphQL/Users/queries";

const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/dashboard");
        }
    }, [])

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
    ]);

    const [getUsers, { data, loading, error }] = useLazyQuery(GET_USER, {
        onCompleted: (data) => {
            if (data.users.length === 0) {
                Swal.fire(
                    'Login Gagal!',
                    'Username atau password tidak valid.',
                    'error'
                )
            }
            else {
                localStorage.setItem("token", JSON.stringify(data.users[0]));

                Swal.fire(
                    'Login Berhasil!',
                    'Ayo Daftar!!!',
                    'success'
                )

                navigate("/dashboard");
            }
        },
        onError: (error) => {
            alert("Ada Error!!!");
        }
    })

    const handleSubmit = (e) => {

        e.preventDefault();

        getUsers({
            variables: {
                username: inputs[0].value,
                password: inputs[1].value,
            }
        })

        setInputs([...inputs], inputs[0].value = "", inputs[1].value = "");
    }

    return (
        <>
            <Header />
            <div className={styles.login_container}>
                <h2>Login</h2>
                {
                    loading ?
                        <Spinner animation="border" variant="light" className={styles.spinner} />
                        :
                        <></>
                }
                <Form inputs={inputs} setInputs={setInputs} buttonText="Login" handleSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default Login;