import React, { useState } from 'react';
import SignInCustomer from '../../components/Registration/signIn';
import { ChatState } from '../../context/chatContext';
import { loginCustomer } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

// SignIn component for customer sign-in functionality
const SignIn = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(""); // State to store user ID
    const [error, setError] = useState(""); // State to store any error messages
    const { setUser } = ChatState(); // Function from context to set the user

    // Function to handle login
    const handleLogin = async () => {
        const response = await loginCustomer(userId); // Call to login API
        console.log(response); // Logging the response for debugging

        if (response?.user) {
            setUser(response.user); // Setting user in context
            localStorage.setItem("userInfo", JSON.stringify(response.user)); // Storing user info in localStorage
            navigate('/raisequery'); // Navigating to the raise query page
        } else if (response.success === true && response?.message) {
            setError(response?.message); // Setting error message if present in the response
        }
    };

    // Rendering the SignInCustomer component with necessary props
    return (
        <SignInCustomer
            url="/customersignup"
            userId={userId}
            setUserId={setUserId}
            error={error}
            setError={setError}
            handleLogin={handleLogin}
        />
    );
};

export default SignIn;
