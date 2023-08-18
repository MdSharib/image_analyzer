import React, { useEffect, useState } from "react";
import styles from "./count.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Count = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [viewCount, setViewCount] = useState(0);

  const logoutHandler = () => {
    console.log("logout btn clicked");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const img = JSON.parse(sessionStorage.getItem("image"));
    setImage(img);
  }, []);

  useEffect(() => {
    async function fetchViewCount() {
      try {
        const response = await axios.get("/api/images/dicof9asg/views");
        setViewCount(response.data.viewCount);
      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    }

    fetchViewCount();
  }, []);

  // reload
  const handleReloadClick = () => {
    const handleImageLoad = async () => {
      try {
        await axios.post("/api/images/dicof9asg/views");
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };
    handleImageLoad();
    window.location.reload();
  };

  return (
    <div className={styles.div}>
      <div className={styles.header}>
        <div>Image Analyzer</div>

        <button
          className={styles.btn}
          onClick={() => {
            navigate("/count");
          }}
        >
          Image Count
        </button>

        <button className={styles.btn} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className={styles.result}>
        <div>
          <div>Your Image Preview</div>
          <button className={styles.btn} onClick={handleReloadClick}>
            Reload
          </button>
          <div>No of counts : {viewCount}</div>
          {image && <img src={image} />}
        </div>
      </div>
    </div>
  );
};

export default Count;
