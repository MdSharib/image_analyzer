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
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);


  // handling per image click
  const imageClickHandler = (url) => {

    const handleImageLoad = async () => {
      try {
        const res = await axios.post(`/api/images/views`, { url: url });
        if (res && res.data.success) {
          setImages(res.data.uploadedImages)
        } else {
          console.log(res.data.message);
        }

      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };
    handleImageLoad();
  
  }

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
          <div>Your Images Preview</div>
          <ul>
        {images && images.map((imageUrl, index) => (
          <li key={index+543}>
          <div key={index+2342}>Views : {imageUrl.views}</div>
            <img src={imageUrl.url} alt={`Image ${index}`} onClick={() => imageClickHandler(imageUrl.url)}/>
          </li>
          
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
};

export default Count;
