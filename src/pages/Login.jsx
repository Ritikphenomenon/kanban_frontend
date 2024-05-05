

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
                username: username,
                password: password,
            });
            console.log(response.data.message); // Display success message
            localStorage.setItem("token", response.data.token); // Store the token
            navigate("/taskses"); // Navigate to the options page
        } catch (error) {
            console.error("Error logging in:", error.response.data.message);
            // Display error message or perform error handling
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="max-w-md bg-white p-8 rounded shadow-md w-full">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="username" className="block font-semibold">Username:</label>
                        <input id="username" name="username" type="text" required className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-semibold">Password:</label>
                        <input id="password" name="password" type="password" required className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="button" onClick={handleLogin} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Login</button>
                </form>
                <p className="text-center mt-4">Not an admin? <a href="/Signup" className="text-blue-500 hover:underline">Register</a></p>
            </div>
        </div>
    );
}

