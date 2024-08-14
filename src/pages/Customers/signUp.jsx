import React, { useState } from 'react';
import SignUp from '../../components/Registration/signUp';
import { signupUser } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

// Component for customer signup
const SignupCustomer = () => {
    const [userId, setUserId] = useState(""); // State to store user ID
    const [error, setError] = useState("");   // State to store any error messages

    const navigate = useNavigate();

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signupUser(userId, false);
            if (response.success) {
                navigate('/logincustomer'); // Navigate to login page on success
            } else {
                setError(response.message); // Set error message from response
            }
        } catch (error) {
            setError("An unexpected error occurred."); // Set generic error message on exception
        }
    };

    return (
        <SignUp
            user={userId}
            setUserId={setUserId}
            error={error}
            handleSubmit={handleSubmit}
        />
    );
};

export default SignupCustomer;
