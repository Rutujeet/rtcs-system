import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../context/chatContext';
import { raiseQuery } from '../../actions/chat';

// Component for raising a query and navigating based on the response
const RaiseQuery = () => {
    const { user, setSelectedChat } = ChatState();
    const navigate = useNavigate();

    // Handles the submission and navigation logic
    const handleSubmit = async () => {
        try {
            const response = await raiseQuery(user?.userId, user?._id);
            setSelectedChat(response?.fullChat);
            navigate("/customerchatbox");
        } catch (err) {
            console.error(err); // Improved error logging
        }
    };

    // Button component for reuse
    const Button = ({ onClick, color, text }) => (
        <div
            onClick={onClick}
            className={`bg-${color}-500 hover:bg-${color}-600 cursor-pointer text-white text-center font-medium px-6 py-3 rounded`}
        >
            {text}
        </div>
    );

    return (
        <div id="container" className="flex items-center justify-center min-h-screen">
            <div className="bg-black lg p-8 shadow-md">
                {/* Button to navigate to the dashboard */}
                <Button onClick={handleSubmit} color="blue" text="Take me to Dashboard!" />
            </div>
            <div className="bg-black lg p-8 shadow-md">
                {/* Button to go back to the login page */}
                <Button onClick={() => navigate('/login')} color="red" text="Go back to Login page" />
            </div>
        </div>
    );
};

export default RaiseQuery;