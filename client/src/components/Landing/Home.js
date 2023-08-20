import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setImageUrl } from "../store/ImageSlice";
import Preview from "./Preview";

const Home = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.image.imageUrl);
  const [newImageUrl, setNewImageUrl] = useState("");

  const [previewUrl, setPreviewUrl] = useState(null);

  // setting
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      navigate("/unauthorized");
      return;
    }
    if (!user.isVerified) {
      navigate("/unauthorized");
      return;
    }
  }, []);

  // handling logout
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

  // handling images upload
  const uploadHandler = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("please enter a title");
      return;
    }
    if (!desc) {
      setError("please enter a description");
      return;
    }
    if (!file) {
      setError("please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "haty0ghh");
    formData.append("cloud_name", "dicof9asg");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dicof9asg/image/upload",
      formData
    );
    const imageUrl = res.data.secure_url;
    setImage(res.data.secure_url);
    // redux store
    dispatch(setImageUrl(res.data.secure_url));
    // server
    await axios.post("/api/upload", { imageUrl });

    setTitle("");
    setDesc("");

    setError(false);
  };

  return (
    <div className={styles.div}>
      <div className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.headerHeading}>.Viewer</div>

          <div className={styles.headerBtnDiv}>
            {image && (
              <button
                className={styles.btn}
                onClick={() => {
                  navigate("/count");
                }}
              >
                View Images
              </button>
            )}

            <button className={styles.btn} onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className={styles.result}>
        <div className={styles.innerResult}>
          <input
            type="text"
            value={title}
            placeholder="Title"
            className={styles.innerResultInput}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            value={desc}
            placeholder="Description"
            className={styles.innerResultInput}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />

          <input
            type="file"
            onChange={handleFileChange}
            className={styles.innerResultInput}
          />

          {previewUrl && (
            <img src={previewUrl} alt="Preview" className={styles.imgPreview} />
          )}

          <button
            type="button"
            className={styles.uploadBtn}
            onClick={uploadHandler}
          >
            {" "}
            Upload file
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}

        {image && (
          <div className={styles.previewDiv}>
            <div className={styles.previewHeading}>Image Preview</div>
            <Preview />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
