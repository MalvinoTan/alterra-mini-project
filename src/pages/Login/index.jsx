import { useLazyQuery } from "@apollo/client";

/** Styles */
import { useState } from "react";
import styles from "./style.module.css";

const Login = () => {

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
            type: "text",
            value: "",
            placeholder: "Masukkan Password",
        },
    ]);

    const handleInput = (value, idx) => {
        setInputs([...inputs], inputs[idx].value = value);
    }

    const [getUser, { data, loading }] = useLazyQuery(GET_USER);

    return (
        <div className={styles.login_container}>
            <h2>Login</h2>
            <form onSubmit={() => { }}>
                {
                    inputs.map((input, inputIdx) => (
                        <>
                            <label>{input.label}</label>
                            <input
                                key={inputIdx}
                                type={input.type}
                                value={input.value}
                                onChange={(e) => handleInput(e.target.value, inputIdx)}
                                placeholder={input.placeholder} required />
                        </>
                    ))
                }

                <button type="submit">Login</button>
            </form>

        </div>
    );
};

export default Login;