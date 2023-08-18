import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

const Home = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

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
    // if (!auth || auth.isVerified !== 1) {
    //   navigate("/unauthorized");
    // } else {
    //   const phone = auth.phone;

    //   const sendPhone = async () => {
    //     try {
    //       const res = await axios.post("/phone", {
    //         phone,
    //       });
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };
    //   sendPhone();
    // }
  }, []);

  const logoutHandler = () => {
    console.log("logout btn clicked");
    sessionStorage.removeItem("user");
    navigate("/");
  };

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

    setImage(res.data.secure_url);
    sessionStorage.setItem("image", JSON.stringify(res.data.secure_url));

    setTitle("");
    setDesc("");

    setError(false);
  };

  return (
    <div className={styles.div}>
      <div className={styles.header}>
        <div>Image Analyzer</div>

        {image && (
          <button
            className={styles.btn}
            onClick={() => {
              navigate("/count");
            }}
          >
            Image Count
          </button>
        )}

        <button className={styles.btn} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className={styles.result}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          value={desc}
          placeholder="Description"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />

        <input type="file" onChange={handleFileChange} />

        {previewUrl && (
          <img src={previewUrl} alt="Preview" className={styles.imgPreview} />
        )}

        <button type="button" className={styles.btn} onClick={uploadHandler}>
          {" "}
          Upload file
        </button>
        {error && <div className={styles.error}>{error}</div>}
        <div>
          <div>Your Image Preview</div>
          {image && <img src={image} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
