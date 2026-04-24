import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://127.0.0.1:8000";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.detail || "Invalid credentials");
            }
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user_id", data.user.id);
            localStorage.setItem("username", data.user.username);
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="col-md-6 offset-md-3">
            <h3 className="mb-3">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
export default Login;
