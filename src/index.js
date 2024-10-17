import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseContext, AuthContext } from "./store/FirebaseContext";
import Context from "./store/FirebaseContext";
import { auth, db, storage } from "./firebase/config";

ReactDOM.render(
  <FirebaseContext.Provider value={{ auth, db, storage }}>
    <AuthContext.Provider value={{ user: null }}>
      <Context>
        <App />
      </Context>
    </AuthContext.Provider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);