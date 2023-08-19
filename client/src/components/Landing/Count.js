import React, { useEffect, useState } from "react";
import styles from "./count.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Count = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState();
  const [viewCount, setViewCount] = useState(0);


  const logoutHandler = () => {
    console.log("logout btn clicked");
    const details = JSON.parse(sessionStorage.getItem("user"));
    const access = {
      ...details,
      isVerified: false,
    }
    sessionStorage.setItem("user", JSON.stringify(access));
    sessionStorage.removeItem("image");
    
    navigate("/");
  };

  useEffect(() => {
    // fetch images from backend
    async function fetchImages() {
      try {
        const response = await axios.get('/api/images');
        setImages(response.data.images);
        // console.log("images response -> ", response.data.images)
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  // reload
  const handleReloadClick = () => {
    const handleImageLoad = async () => {
      try {
        const urlArray = [
          ...images
        ];
        
        const publicIdsArray = urlArray.map(item => item.url).join(',');
        await axios.post(`/api/images/views`, { publicIds: publicIdsArray });
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
          <ul>
        {images && images.map((imageUrl, index) => (
          <li key={index+543}>
          <div key={index+2342}>Views : {imageUrl.views}</div>
            <img src={imageUrl.url} alt={`Image ${index}`} />
          </li>
          
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
};

export default Count;
