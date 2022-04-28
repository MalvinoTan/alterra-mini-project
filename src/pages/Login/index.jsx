import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Form from "../../components/Form";
import { GET_USER } from "../../GraphQL/Users/queries";
import { Spinner } from "react-bootstrap";
import Header from "../../components/Header";

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
                alert("Username atau Password Tidak Valid!!!");
            }
            else {
                localStorage.setItem("token", JSON.stringify(data.users[0]));
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