import React, { useState } from 'react';
import { Box } from "@chakra-ui/layout";
import Chat from '../../components/AgentChat/chatBox';
import ChatList from '../../components/AgentChat/chatList';
import { ChatState } from '../../context/chatContext';

// Chatpage component for displaying chat interface
const Chatpage = () => {
    // State to trigger re-fetching of chat data
    const [shouldRefetch, setShouldRefetch] = useState(false);
    // Extracting user from ChatState context
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {/* Main chat container with responsive height and padding */}
            <Box display="flex" justifyContent="space-between" w="100%" h="95vh" p="10px">
                {/* Conditional rendering of ChatList and Chat components if user exists */}
                {user && <ChatList fetchAgain={shouldRefetch} />}
                {user && (
                    <Chat fetchAgain={shouldRefetch} setFetchAgain={setShouldRefetch} />
                )}
            </Box>
        </div>
    );
};

export default Chatpage;