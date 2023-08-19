import express, { urlencoded } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";


//config env
dotenv.config();



//rest object
const app = express();

//middlewares
app.use(cors()); 
app.use(express.json()); 
app.use(morgan("dev")); 


// to keep track of view count
const viewCounts = {};

// to store the image
let uploadedImages = [];

//routes
// increment view count
app.post('/api/images/views', (req, res) => {
  const { publicIds } = req.body; 
  const recievedUrl = publicIds.split(",");
    recievedUrl.forEach(publicId => {
    const updatedImages = uploadedImages.map(val => {
      if (publicId === val.url) {
        val.views = val.views + 1;
      }
      return val;
    });

    uploadedImages = [...updatedImages];
  });

  res.json({ message: 'View counts incremented.' });

});


// handle upload of image
app.post('/api/upload', (req, res) => {
  const { imageUrl } = req.body;
  if(uploadedImages.length <= 0){
    const img ={
      url: imageUrl,
      views: 0,
    }
    uploadedImages.push(img);
  }else {
    const findUrl = uploadedImages.find((val) => {
      return val.url === imageUrl;
    })
    if(!findUrl){
      const img ={
        url: imageUrl,
        views: 0,
      }
      uploadedImages.push(img);
    }    
  }

  res.status(201).json({ message: 'Image URL uploaded.' });
});


// Get all uploaded images
app.get('/api/images', (req, res) => {
  const images = [...uploadedImages]

  res.json({ images });
});





//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to image analyzer app</h1>");
});


//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`
      
  );
});

