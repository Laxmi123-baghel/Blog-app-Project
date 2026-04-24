
import React from "react";
import { Link, useNavigate } from "react-router-dom";
  
function Navbar()
{
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        navigate("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">FASTAPI Blog</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">
                                        All Users
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-Post">Create Post</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onclick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ):(
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;