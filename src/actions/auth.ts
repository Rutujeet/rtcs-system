const api: string = "http://localhost:8080/api";

// Helper function to perform API requests
async function performRequest(endpoint: string, body: object): Promise<any> {
    try {
        const response = await fetch(`${api}${endpoint}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    } catch (err) {
        console.error("API request failed:", err);
    }
}

// Registers a new user
export const signupUser = async (userId: string, isAgent: boolean): Promise<any> => {
    return performRequest("/user/registeruser", { userId, isAgent });
};

// Logs in a customer
export const loginCustomer = async (userId: string): Promise<any> => {
    return performRequest("/user/logincustomer", { customerId: userId });
};

// Logs in an agent
export const loginAgent = async (userId: string): Promise<any> => {
    return performRequest("/user/loginagent", { agentId: userId });
};
