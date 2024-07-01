import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPassword from "../components/ResetPassword/ResetPassword";

const ResetPasswordTokenPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <ResetPassword />
        </div>
    );
}

export default ResetPasswordTokenPage;
