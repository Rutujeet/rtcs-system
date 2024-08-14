import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../src/index.css"


// Component for selecting the user role for login
const SelectRole = () => {
    // Common button styles
    const buttonClass = "bg-red-500 hover:bg-red-600 cursor-pointer text-white text-center font-medium px-10 py-10 rounded";

    return (
        <div
            id="container"
            className="flex items-center justify-center min-h-screen"
        >
            <div className="bg-black rounded-lg p-8 shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    Kindly select the mode to login with
                </h1>
                <div className="grid gap-4">
                    {/* Link for Agent login */}
                    <Link
                        to="/loginagent"
                        className={`${buttonClass} bg-red-500 hover:bg-red-600`}
                    >
                        Agent
                    </Link>
                    {/* Link for Customer login */}
                    <Link
                        to="/logincustomer"
                        className={`${buttonClass} bg-blue-500 hover:bg-blue-600`}
                    >
                        Customer
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SelectRole;