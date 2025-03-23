import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema({
  poster_path: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: String, required: true }
});


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordExpire: {type: Date},
  otp: {type:String},
  createdAt: {
    type: Date,
    default: Date.now()
},
isPremium: {
    type: Boolean,
    default: false
},
role: {
    type: String,

    default: "user"
}
});


export default mongoose.model("User", UserSchema);
