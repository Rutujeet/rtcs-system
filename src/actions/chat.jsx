const api = "http://localhost:8080/api";

// Helper function to handle fetch requests
const fetchData = async (url, method, body = null) => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const config = {
        method: method,
        headers: headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Fetch error:', err);
        throw err;
    }
};

// Function to raise a query in a chat
export const raiseQuery = async (chatId, userId) => {
    return fetchData(`${api}/chat/raisequery`, 'POST', { chatId, userId });
};

// Function to retrieve messages from a chat
export const getMessages = async (chatId) => {
    return fetchData(`${api}/message/getmessages/${chatId}`, 'GET');
};

// Function to send messages in a chat
export const sendMessages = async (content, chatId, userId) => {
    return fetchData(`${api}/message/sendmessage`, 'POST', { content, chatId, userId });
};

// Function to get the list of chats
export const getChatList = async () => {
    return fetchData(`${api}/chat/chatlist`, 'GET');
};

// Function to add an agent to a chat
export const addAgentToList = async (chatId, userId) => {
    return fetchData(`${api}/chat/addagent`, 'POST', { chatId, userId });
};
