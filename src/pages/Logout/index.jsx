import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (params) => {

    const navigate = useNavigate();

    localStorage.removeItem("token");

    useEffect(() => {
        navigate("/");
    }, [])

};

export default Logout;