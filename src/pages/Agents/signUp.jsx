import React, { useState } from 'react';
import SignUp from '../../components/Registration/signUp';
import { signupUser } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

// Component for agent sign-up
const SignupAgent = () => {
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signupUser(userId, true);
            if (response.success) {
                navigate('/loginagent'); // Redirect on success
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

export default SignupAgent;
