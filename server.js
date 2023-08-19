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
const uploadedImages = [];

//routes
// increment view count
app.post('/api/images/:publicId/views', (req, res) => {
  const { publicId } = req.params;

  if (!viewCounts[publicId]) {
    viewCounts[publicId] = 1;
  } else {
    viewCounts[publicId]++;
  }

  res.json({ message: 'View count incremented.' });
});

//get view count
app.get('/api/images/:publicId/views', (req, res) => {
  const { publicId } = req.params;
  const viewCount = viewCounts[publicId] || 0;

  res.json({ viewCount });
});


// for image
app.post('/api/upload', (req, res) => {
  const { imageUrl } = req.body;
  uploadedImages.push(imageUrl);
  res.status(201).json({ message: 'Image URL uploaded.' });
});

app.get('/api/images', (req, res) => {
  res.json({ images: uploadedImages });
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

