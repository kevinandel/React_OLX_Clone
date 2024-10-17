import React, { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Header() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const redirectLogin = () => {
    if (!user) navigate("/login");
  };

  const redirectCreate = () => {
    if (user) {
      navigate("/create");
    } else {
      alert("Login to sell products.")
      navigate("/login");
    }
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => navigate("/")}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder="Kerala" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <button onClick={redirectLogin}>
            <span>{user ? user.displayName : "Login"}</span>
          </button>
          {user && (
            <div onClick={handleLogout} className="dropdown">
              <p>Sign Out</p>
            </div>
          )}
        </div>

        <div className="sellMenu" onClick={redirectCreate}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
