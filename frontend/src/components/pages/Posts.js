import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

function Posts() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("username");

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts/`); // lowercase 'posts'
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error("API did not return an array:", data);
        setPosts([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // Option 1: remove locally
        setPosts(posts.filter((p) => p.id !== id));
        // Option 2: refetch posts
        // fetchPosts();
      } else {
        alert("You can only delete your own posts!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>All Posts</h3>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div className="card my-2 p-3" key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.content}</p>
            <small className="text-muted">Author: {post.author}</small>
            {token && loggedInUserId === post.author && (
              <div className="mt-2">
                <Link
                  className="btn btn-warning btn-sm me-2"
                  to={`/edit-post/${post.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
