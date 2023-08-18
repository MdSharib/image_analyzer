import React from "react";
import { useNavigate } from "react-router-dom";

const Pagenotfound = () => {
const navigate = useNavigate()
  return (
   
      <div>
        <h1>Error! 404</h1>
        <h2>Oops ! Page Not Found</h2>
        <button onClick={() => {navigate("/")}}>
          Go Back
        </button>
      </div>
    
  );
};

export default Pagenotfound;
