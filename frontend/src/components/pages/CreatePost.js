import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token"); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/posts/`, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",       
          Authorization: `Bearer ${token}`,          
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        navigate("/");  
      } else {
        const errorData = await res.json();
        alert("Error creating post: " + errorData.detail || res.statusText);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error creating post!");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;
