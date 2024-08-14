import React, { useState } from 'react';
import SignInAgent from '../../components/Registration/signIn';
import { ChatState } from '../../context/chatContext';
import { loginAgent } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

// SignIn component for agent authentication
const SignIn = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(""); // State to store user ID
    const [error, setError] = useState(""); // State to store any error messages
    const { setUser } = ChatState(); // Function from context to set the user

    // Function to handle login
    const handleLogin = async () => {
        const response = await loginAgent(userId); // Call to login agent
        console.log(response); // Logging the response for debugging

        if (response?.user) {
            setUser(response.user); // Set user in context
            localStorage.setItem("agentInfo", JSON.stringify(response.user)); // Store user info in localStorage
            navigate('/agentchatbox'); // Navigate to chatbox page
        } else if (response.success === true && response?.message) {
            setError(response?.message); // Set error message if present
        }
    };

    // Render the SignInAgent component
    return (
        <SignInAgent
            url={"/agentsignup"}
            userId={userId}
            setUserId={setUserId}
            error={error}
            setError={setError}
            handleLogin={handleLogin}
        />
    );
};

export default SignIn;
