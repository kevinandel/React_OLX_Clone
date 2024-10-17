import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from 'firebase/firestore'; // Import Firestore functions
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom"; // For redirecting
import "./View.css";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(!postDetails) {
      navigate('/')
    }
    const fetchData = async () => {
      setLoading(true);
      if (postDetails && postDetails.userId) {
        const { userId } = postDetails;
        try {
          const userQuery = query(collection(db, 'users'), where('id', '==', userId));
          const querySnapshot = await getDocs(userQuery);

          if (querySnapshot.empty) {
            console.log('No matching user found.');
            setUserDetails(null);
          } else {
            querySnapshot.forEach((doc) => {
              setUserDetails(doc.data());
            });
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [postDetails, db]);



  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!postDetails) {
    return <div>No post details available.</div>;
  }

  return (
    <div className="viewContainer">
      <div className="imageContainer">
        {postDetails.url ? (
          <img src={postDetails.url} alt={postDetails.name} className="productImage" />
        ) : (
          <p>Image not available</p>
        )}
      </div>
      <div className="detailsContainer">
        <h2 className="productName">{postDetails.name}</h2>
        <p className="productPrice">&#x20B9; {postDetails.price}</p>
        <p className="productCategory">{postDetails.category}</p>
        <p className="productDescription">{postDetails.description}</p>
      </div>
      <div className="sellerInfo">
        <h3>Seller Information</h3>
        {userDetails ? (
          <>
            <p>Username: {userDetails.username || "Username not available"}</p>
            <p>Email: {userDetails.email || "Email not available"}</p>
            <p>Phone: {userDetails.phone || "Phone not available"}</p>
          </>
        ) : (
          <p>Loading seller information...</p>
        )}
      </div>
      <div className="postDate">
        <p>Posted on: {postDetails.createdAt}</p>
      </div>
    </div>
  );
}

export default View;
