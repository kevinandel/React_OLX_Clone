import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import PostContextProvider from "./store/PostContext";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute component


function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <PostContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<ProtectedRoute element={<Create />} />} />
          <Route path="/view-post" element={<View />} />
        </Routes>
      </Router>
    </PostContextProvider>
  );
}

export default App;
