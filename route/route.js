import express from 'express';
import { signUp, signIn } from '../controller/userController.js';
import { bookFlight } from '../controller/flightController.js';
import { fetchCert } from '../controller/flightController.js';


const router = express.Router();


router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/bookflight", bookFlight)
router.get("/fetchCert", fetchCert)




export default router;