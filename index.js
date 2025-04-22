import express from 'express' ;
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import route from './route/route.js';
import dotenv from 'dotenv';

dotenv.config()




const app = express();


// middleware
app.use (cors());
app.use (express.json ({limit: "50mb"}));
// app.use (express.urlencoded ({limit: "50mb"}));

// parse apllication
app.use (bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());

// db connection
mongoose.set ("strictQuery", false)
mongoose.connect ("mongodb+srv://zeez:zeez@flight-database.b239h.mongodb.net/?retryWrites=true&w=majority&appName=flight-database",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
)
.then (() => console.log("db connected"))
.catch ((err) => console.log(" db connection error", err));

// API point

app.use ("/api", route);
app.use ("/api/register", route);

const port = 9000
app.listen(port, ()=>console.log(`Server running on port ${port}`))
