import React, { useEffect, useState } from "react";
import styles from "./count.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Count = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState();
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const [viewCount, setViewCount] = useState(0);

  const logoutHandler = () => {
    console.log("logout btn clicked");
    const details = JSON.parse(sessionStorage.getItem("user"));
    const access = {
      ...details,
      isVerified: false,
    };
    sessionStorage.setItem("user", JSON.stringify(access));
    sessionStorage.removeItem("image");

    navigate("/");
  };

  useEffect(() => {
    // fetch images from backend
    async function fetchImages() {
      try {
        const response = await axios.get("/api/images");
        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  // handling per image click
  const imageClickHandler = (url) => {
    // for modal url
    setSelectedImageUrl(url);
    const handleImageLoad = async () => {
      try {
        const res = await axios.post(`/api/images/views`, { url: url });
        if (res && res.data.success) {
          setImages(res.data.uploadedImages);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };
    handleImageLoad();
  };


  const closeModal = () => {
    setSelectedImageUrl(null);
  };

  return (
    <div className={styles.div}>
      <div className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.headerHeading}>.Viewer</div>

          <div className={styles.headerBtnDiv}>
            <button
              className={styles.btn}
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </button>
            <button
              className={styles.btn}
              onClick={() => {
                navigate("/count");
              }}
            >
              View Images
            </button>

            <button className={styles.btn} onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className={styles.result}>
        <div>
          <div className={styles.previewHeading}>Your Images</div>

          <div className={styles.outerImgDiv}>
            {images &&
              images.map((imageUrl, index) => (
                <div key={index + 987} className={styles.innerImgDiv}>
                  <div className={styles.imgDiv}>
                    <img src={imageUrl.url} alt={`Image ${index}`} onClick={() => imageClickHandler(imageUrl.url)}/>
                  </div>

                  <div key={index + 2342} className={styles.url}>Views : {imageUrl.views}</div>
                </div>
              ))}
              {(!images || images.length <= 0) && <div>No Images found!</div>}
          </div>

          {selectedImageUrl && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.imageModal}>
            <img src={selectedImageUrl} alt="Modal Image" />
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Count;
