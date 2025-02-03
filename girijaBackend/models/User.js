const mongoose = require("mongoose");
const Counter = require("./counter");

const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  resetPasswordOTP: { type: String, default: null, required: false },
  resetPasswordExpires: { type: Date, default: null, required: false },
  address: { type: String, required: false },
  pincode: { type: String, required: false },
  language: { type: String, required: false },
  state: { type: String, required: false },
  profileImg: { type: String, required: false },
  like: { type: Boolean, default: false },
  occupationCountry: { type: String, required: false },
  education: {
    degree: { type: String, required: false },
    occupation: { type: String, required: false },
    income: { type: String, required: false },
    occupationCountry: { type: String, required: false },
  },
  // Lifestyle data
  lifestyle: {
    drink: { type: String, required: false },
    smoke: { type: String, required: false },
    diet: { type: String, required: false },
    sunsign: { type: String, required: false },
    bloodgroup: { type: String, required: false },
    bodyType: { type: String, required: false },
    skinType: { type: String, required: false },
  },
  parentPrefer: {
    caste: { type: String, required: false },
    fromAge: { type: Number, required: false },
    toAge: { type: Number, required: false },
    fromHeight: { type: String, required: false },
    toHeight: { type: String, required: false },
    occupation: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    education: { type: String, required: false },
  },
  info: { type: String, required: false },

});

// Pre-save middleware to assign a sequential userId
UserSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Only assign userId on new document creation
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "userId" }, // Counter name
        { $inc: { seq: 1 } }, // Increment sequence
        { new: true, upsert: true } // Create if not exists
      );
      this.userId = counter.seq; // Assign the incremented sequence
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});



const User = mongoose.model("User", UserSchema);

module.exports = User;
