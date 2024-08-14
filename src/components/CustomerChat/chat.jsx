import React, { useEffect, useState } from "react";
import { FormControl, Input, Box, Text, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../utils/Logic";
import ScrollChat from "./scrollChat";
import { ChatState } from "../../context/chatContext";
import { getMessages, sendMessages, getChatList } from "../../actions/chat";
import io from "socket.io-client";

// Endpoint for the socket connection
const ENDPOINT = "http://127.0.0.1:8080";
let socket, selectedChatCompare;

/**
 * Chat component handles the display and interaction within a chat interface.
 * @param {Object} props - Component props
 * @param {boolean} props.fetchAgain - State to trigger refetching of messages
 * @param {Function} props.setFetchAgain - Setter for the fetchAgain state
 */
const Chat = ({ fetchAgain, setFetchAgain }) => {
    const {
        selectedChat,
        setSelectedChat,
        user,
        setChats,
        setNotification,
        notification,
    } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const toast = useToast();

    // Establish socket connection on component mount
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnected(true));
    }, []);

    // Fetch messages for the selected chat
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChat) return;
            setLoading(true);
            const response = await getMessages(selectedChat?._id);
            setMessages(response);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);
        };

        fetchMessages();
    }, [selectedChat]);

    // Handle new message reception via socket
    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            setFetchAgain(!fetchAgain);
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived?.chat?._id)) {
                    setNotification([newMessageReceived?.chat?._id, ...notification]);
                }
            } else {
                setMessages(prevMessages => [...prevMessages, newMessageReceived]);
            }
        });
    }, [fetchAgain, notification, selectedChatCompare]);

    // Send new message
    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                setNewMessage("");
                const messageData = {
                    content: newMessage,
                    chatId: selectedChat?._id,
                    userId: user?._id,
                };
                const response = await sendMessages(messageData);
                socket.emit("new message", response);
                setMessages(prevMessages => [...prevMessages, response]);
                const chatListUpdate = await getChatList();
                setChats(chatListUpdate);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    return (
        <>
            <Text fontSize={{ base: "28px", md: "30px" }} pb={3} px={2} w="100%" fontFamily="Work sans" d="flex" justifyContent="space-between" alignItems="center">
                {selectedChat?.chatId?.toUpperCase()}
            </Text>
            <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg" overflowY="scroll">
                {loading ? (
                    <Spinner size="lg" w={20} h={20} alignSelf="center" margin="auto" />
                ) : (
                    <ScrollChat messages={messages} />
                )}
                <FormControl onKeyDown={sendMessage} id="message-input" isRequired mt={3}>
                    <Input variant="filled" bg="carbon-black" placeholder="Enter a message.." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                </FormControl>
            </Box>
        </>
    );
};

export default Chat;