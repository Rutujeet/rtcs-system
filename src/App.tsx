import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

// Importing pages for customer interactions
import Landing from "./pages/Home";
import SignInCustomer from "./pages/Customers/signIn";
import SignupCustomer from "./pages/Customers/signUp";
import RaiseQuery from "./pages/Customers/raiseQuery";
import CustomerChatbox from "./pages/Customers/chatBox";

// Importing pages for agent interactions
import SignInAgent from "./pages/Agents/signIn";
import SignupAgent from "./pages/Agents/signUp";
import AgentChatBox from "./pages/Agents/chatBox";

/**
 * App component sets up the routing for the entire application.
 * It defines routes for both customer and agent functionalities.
 */
const App: FC = () => {
  return (
    <Routes>
      {/* Routes for general access */}
      <Route path="/" element={<Landing />} />

      {/* Routes for customer functionalities */}
      <Route path="/logincustomer" element={<SignInCustomer />} />
      <Route path="/customersignup" element={<SignupCustomer />} />
      <Route path="/raisequery" element={<RaiseQuery />} />
      <Route path="/customerchatbox" element={<CustomerChatbox />} />

      {/* Routes for agent functionalities */}
      <Route path="/loginagent" element={<SignInAgent />} />
      <Route path="/agentsignup" element={<SignupAgent />} />
      <Route path="/agentchatbox" element={<AgentChatBox />} />
    </Routes>
  );
};

export default App;