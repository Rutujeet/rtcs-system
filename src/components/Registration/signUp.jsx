import React from 'react';

// SignUp component handles the user registration form
const SignUp = ({ handleSubmit, error, userId, setUserId }) => {
    // Form submission handler is passed down via props
    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-black shadow-lg rounded-lg p-8 w-full sm:w-96">
                <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Enter Name
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
