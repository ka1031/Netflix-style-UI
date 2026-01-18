import React, { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Signup successful ✅");
                setEmail("");
                setPassword("");
            } else {
                setMessage(data.message || "Signup failed ❌");
            }
        } catch (error) {
            console.error(error);
            setMessage("Server error ❌");
        }
    };

    return (
        <div className="form_flex">
            <div className="form_tile">
                <div className="tileHead">
                    <h1>Sign Up</h1>
                </div>

                <div className="form1">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="submit">
                            Submit
                        </button>
                    </form>

                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Signup;
