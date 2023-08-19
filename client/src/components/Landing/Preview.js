import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Preview = () => {
  
  const imageUrl = useSelector((state) => state.image.imageUrl);

  return (
    <div>
      <h2>Image URL: {imageUrl}</h2>
      <img
        src={imageUrl}
      />
    </div>
  );
}

export default Preview;