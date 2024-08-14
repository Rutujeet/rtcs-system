import React, { useEffect, useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Input } from "@chakra-ui/react";
import { ChatState } from "../../context/chatContext";
import { getChatList, addAgentToList } from "../../actions/chat";
import ChatLoading from "./chatLoading";

// ChatList component displays the list of chats and handles chat selection
const ChatList = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const {
        selectedChat,
        setSelectedChat,
        user,
        chats,
        setChats,
        notification,
        setNotification,
    } = ChatState();
    const toast = useToast();

    // Fetch chats from the server
    const fetchChats = async () => {
        try {
            const response = await getChatList();
            setChats(response);
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: "Failed to load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    // Initialize component state
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("agentInfo")));
        fetchChats();
    }, [fetchAgain]);

    // Filter chats based on search query
    const filteredChats = chats?.filter((chat) =>
        chat.chatId.includes(searchQuery)
    );

    // Handle chat selection
    const handleSelect = async (chat) => {
        try {
            const response = await addAgentToList(chat._id, user._id);
            setSelectedChat(response);
            setNotification(notification.filter((n) => n?.chat?._id === chat._id));
        } catch (error) {
            // Handle error (could add a toast here if needed)
        }
    };

    // Check if there are notifications for a chat
    const checkNotification = (chat) => notification?.includes(chat._id);

    return (
        <Box display="flex" flexDir="column" alignItems="center" p={3} bg="carbon-black" w="35%" borderRadius="lg" borderWidth="1px">
            <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" display="flex" w="100%" justifyContent="space-between" alignItems="center" color="white">
                Customers Queries
            </Box>
            <Box pb={3} px={3} w="100%">
                <Input placeholder="Search by Customer ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </Box>
            <Box display="flex" flexDir="column" p={3} bg="#F8F8F8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
                {chats ? (
                    <Stack overflowY="scroll">
                        {filteredChats.map((chat) => (
                            chat?.latestMessage?.content?.length > 0 ? (
                                <Box onClick={() => handleSelect(chat)} cursor="pointer" bg={selectedChat?._id === chat?._id ? "#38B2AC" : "#E8E8E8"} color={selectedChat?._id === chat?._id ? "white" : "black"} px={3} py={2} borderRadius="lg" key={chat._id}>
                                    <Box display="flex" justifyContent="space-between" alignContent="center">
                                        <Text>{chat.chatId}</Text>
                                        <Box>{chat?.users?.length - 1 === 0 ? "No" : chat?.users?.length - 1} Agent</Box>
                                    </Box>
                                    {chat.latestMessage && (
                                        <Box display="flex" justifyContent="space-between">
                                            <Text fontSize="xs">
                                                <b>{chat.latestMessage.sender.userId} : </b>
                                                {chat.latestMessage.content.length > 50 ? `${chat.latestMessage.content.substring(0, 51)}...` : chat.latestMessage.content}
                                            </Text>
                                            <Box>{checkNotification(chat) && <Box h="10px" w="10px" bg="red.500" borderRadius="20"></Box>}</Box>
                                        </Box>
                                    )}
                                </Box>
                            ) : <div></div>
                        ))}
                    </Stack>
                ) : <ChatLoading />}
            </Box>
        </Box>
    );
};

export default ChatList;
