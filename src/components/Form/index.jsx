/** Styles */
import styles from "./style.module.css";

const Form = ({ inputs, setInputs, buttonText, handleSubmit }) => {

    const handleInput = (value, idx) => {
        setInputs([...inputs], inputs[idx].value = value);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form_container}>
            {
                inputs.map((input, inputIdx) => (
                    <div className={styles.form_item} key={inputIdx}>
                        <label>{input.label}</label>
                        <input
                            type={input.type}
                            value={input.value}
                            onChange={(e) => handleInput(e.target.value, inputIdx)}
                            placeholder={input.placeholder} required />
                    </div>
                ))
            }

            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default Form;