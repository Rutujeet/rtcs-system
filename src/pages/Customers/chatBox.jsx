import React, { useState } from "react";
import { ChatState } from "../../context/chatContext";
import { Box } from "@chakra-ui/layout";
import Chat from "../../components/CustomerChat/chat";

// Retrieve user information from local storage
const user = JSON.parse(localStorage.getItem("userInfo"));

const ChatBox = () => {
    // Accessing selectedChat from ChatState context
    const { selectedChat } = ChatState();

    // State to trigger re-fetching of data
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <Box w="100%" h="100vh" p="10px">
            {/* Conditional rendering based on selectedChat state */}
            <Box
                display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
                alignItems="center"
                flexDir="column"
                p={3}
                bg="carbon-black"
                w="100%"
                borderRadius="lg"
                borderWidth="1px"
                h="100%"
            >
                {/* Chat component with props to manage fetching state */}
                <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </Box>
        </Box>
    );
};

export default ChatBox;