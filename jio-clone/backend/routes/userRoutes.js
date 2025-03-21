import express from 'express'
const UserRouter = express.Router();
import { protectRouteMiddleWare } from '../controllers/authcontroller.js';
import { addToWishlist, getUserWishlist, getCurrentUser } from "./../controllers/usercontroller.js";

UserRouter.use(protectRouteMiddleWare);
UserRouter.get("/wishlist", getUserWishlist);
UserRouter.get("/",getCurrentUser);
UserRouter.post("/wishlist", addToWishlist);


export default UserRouter