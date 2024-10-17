import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../store/PostContext";

function Posts() {
  const [products, setProducts] = useState([]);
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const { setPostDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(allPosts);
        console.log(allPosts); // Check if products are fetched
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [db]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Products</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              onClick={() => {
                setPostDetails(product); // Set selected post details in context
                navigate("/view-post");
              }}
              className="card"
              key={product.id}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
