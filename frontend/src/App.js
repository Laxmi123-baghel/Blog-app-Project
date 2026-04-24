  import React from "react";
  import { Routes, Route} from "react-router-dom";
  import Navbar from "./components/Navbar";
  import Signup from "./components/pages/Signup";
  import Login from "./components/pages/Login";
  import Posts from "./components/pages/Posts";
  import CreatePost from "./components/pages/CreatePost";
  import EditPost from "./components/pages/EditPost";
  import AllUsers from "./components/pages/AllUsers";
    

  function App()
  {
    return (
      <>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
          </Routes>
        </div>
      </>
    )
  }

  export default App;