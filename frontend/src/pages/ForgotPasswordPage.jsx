import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <ForgotPassword />
        </div>
    );
}

export default ForgotPasswordPage;
