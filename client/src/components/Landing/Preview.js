import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./preview.module.css"

const Preview = () => {
  
  const imageUrl = useSelector((state) => state.image.imageUrl);

  return (
    <div className={styles.outerImgDiv}>

        {imageUrl && imageUrl.map((url, index) => (
          <div key={index+987} className={styles.innerImgDiv}>
          <div className={styles.imgDiv}><img src={url} alt={`Image ${index}`} /></div>
            
          <div key={index+2434} className={styles.url}>
            <a href={url} target="_blank" >Click here for Cloudinary Image URL</a>
            </div>  
          
          </div>
        ))}
     
    </div>
  );
}

export default Preview;