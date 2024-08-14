import React from "react";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../../context/chatContext";
import ChatBox from "../CustomerChat/chat";

// Chat component that conditionally renders based on the selected chat
const Chat = ({ fetchAgain, setFetchAgain }) => {
    // Accessing the selected chat from the chat context
    const { selectedChat } = ChatState();

    return (
        // Box component from Chakra UI to style the chat container
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w="64%"
            borderRadius="lg"
            borderWidth="1px"
        >
            {/* ChatBox component that handles the chat UI */}
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default Chat;