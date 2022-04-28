import { useMutation } from "@apollo/client";
import { useState } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

/** Bootstrap Components */
import { Spinner } from "react-bootstrap";

/** Styles */
import styles from "./style.module.css";

/** Queries */
import { INSERT_MEMBER } from "../../GraphQL/Members/queries";

/** Components */
import Form from "../../components/Form";
import Header from "../../components/Header";

const AddMember = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [insertMember, { loading }] = useMutation(INSERT_MEMBER, {
        onCompleted: (data) => {
            navigate(`/dashboard/${id}`);
        },
        onError: (error) => {
            alert("Ada Error!!!");
        }
    })

    const [inputs, setInputs] = useState([
        {
            label: "Nama",
            name: "nama",
            type: "text",
            value: "",
            placeholder: "Masukkan Nama",
        },
        {
            label: "NIM",
            name: "nim",
            type: "text",
            value: "",
            placeholder: "Masukkan NIM",
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
            type: "tel",
            value: "",
            placeholder: "Masukkan No Handphone",
        },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        insertMember({
            variables: {
                id_team: id,
                name: inputs[0].value,
                nim: inputs[1].value,
                email: inputs[2].value,
                noHandphone: inputs[3].value,
            }
        })

        setInputs([...inputs], inputs[0].value = "", inputs[1].value = "", inputs[2].value = "", inputs[3].value = "");
    }

    return (
        <>
            <Header />
            <Link to={`/dashboard/${id}`} className={styles.back}>&lt; Back to Team Data</Link>
            <div className={styles.add_member_container}>
                <h2>Tambah Anggota</h2>
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

export default AddMember;