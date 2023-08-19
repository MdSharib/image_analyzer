import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Preview = () => {
  
  const imageUrl = useSelector((state) => state.image.imageUrl);

  return (
    <div>
      
      <ul>
        {imageUrl && imageUrl.map((url, index) => (
          <div key={index+987}>
          <h2 key={index+2434}>Image URL: {url}</h2>
          <li key={index}>
            <img src={url} alt={`Image ${index}`} />
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Preview;