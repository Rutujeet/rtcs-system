import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../../utils/Logic";
import { ChatState } from "../../context/chatContext";

// Component for displaying chat messages with auto-scrolling
const ScrollChat = ({ messages }) => {
    const { user } = ChatState();

    // Function to determine the avatar source based on whether the sender is an agent
    const getAvatarSrc = (sender) => sender.isAgent
        ? "https://cdn-icons-png.flaticon.com/512/11624/11624409.png"
        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

    // Function to determine the style of message bubble based on the sender
    const getMessageStyle = (message, index) => ({
        backgroundColor: message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
        marginLeft: isSameSenderMargin(messages, message, index, user._id),
        marginTop: isSameUser(messages, message, index, user._id) ? 3 : 10,
        borderRadius: "20px",
        padding: "5px 15px",
        maxWidth: "75%",
    });

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div style={{ display: "flex" }} key={m._id}>
                    {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                        <Tooltip
                            label={m.sender.userId}
                            placement="bottom-start"
                            hasArrow
                        >
                            <Avatar
                                mt="7px"
                                mr={1}
                                size="sm"
                                cursor="pointer"
                                name={m.sender.userId}
                                src={getAvatarSrc(m.sender)}
                            />
                        </Tooltip>
                    )}
                    <span style={getMessageStyle(m, i)}>
                        {m.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    );
};

export default ScrollChat;
