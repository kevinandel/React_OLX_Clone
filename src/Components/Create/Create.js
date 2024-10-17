import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/FirebaseContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { storage, db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const date = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.error("No image selected");
      return;
    }
    try {
      const storageRef = ref(storage, `/images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: date.toDateString(),
      });
      navigate('/')

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <br />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            required
          />
          <br />
          {image && (
            <img
              alt="Preview"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <br />
          <button type="submit" className="uploadBtn">
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
