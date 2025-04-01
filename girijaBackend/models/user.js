const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Include _id explicitly
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ref_no: { type: String, required: true , default : "SGM008" },
  user_role: { type: String , default : "FreeUser" },
  status: { type: String , default : "inactive" },
  UpdateStatus: { type: String },
  counter: { type: Number, default: 0 },
  last_loggedin: { type: String }, 
  loggedin_from: { type: String },
  mobile_no: { type: Number }
}, { timestamps: true, collection: "user_tbl" }); 


const UserModel = mongoose.model("user_tbl",UserSchema)
module.exports = UserModel;
