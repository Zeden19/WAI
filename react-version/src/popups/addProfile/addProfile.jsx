// src/popups/default/homePage.jsx
import React from "react";
import ReactDOM from "react-dom/client";

function AddProfile() {
  return (
    <div>
      <h1>stupid ass stupid ass stupid ass</h1>
      <button onClick={() => console.log("clicked")}>Sign in with Google</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AddProfile />);
