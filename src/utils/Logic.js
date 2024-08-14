// Determines the margin for message bubbles to visually group messages from the same sender
export const isSameSenderMargin = (messages, m, i, userId) => {
    if (i < messages.length - 1) {
        const nextMessage = messages[i + 1];
        // If the next message is from the same sender and not from the user, return a specific margin
        if (nextMessage.sender._id === m.sender._id && messages[i].sender._id !== userId) {
            return 33;
        // If the next message is from a different sender and not from the user, return no margin
        } else if (nextMessage.sender._id !== m.sender._id && messages[i].sender._id !== userId) {
            return 0;
        }
    }
    // For the last message or if the sender is the user, return "auto" to handle margin differently
    return (i === messages.length - 1 && messages[i].sender._id !== userId) ? 0 : "auto";
};

// Checks if the current message is from a different sender than the next message or if the next message is undefined
export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

// Determines if the current message is the last message in the array and not from the user
export const isLastMessage = (messages, i, userId) => {
    const lastMessage = messages[messages.length - 1];
    return i === messages.length - 1 && lastMessage.sender._id !== userId && lastMessage.sender._id;
};

// Checks if the previous message is from the same sender as the current message
export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

// Finds and returns the name of the first user who is not the logged-in user
export const getSender = (loggedUser, users) => {
    return users.find(user => user._id !== loggedUser._id).name;
};

// Finds and returns the full user object of the first user who is not the logged-in user
export const getSenderFull = (loggedUser, users) => {
    return users.find(user => user._id !== loggedUser._id);
};
