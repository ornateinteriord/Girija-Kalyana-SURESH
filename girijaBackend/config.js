const mongoose = require('mongoose');
require('dotenv').config();
const Counter = require('./models/counter');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize the counter for userId after the database connection
    const initializeCounter = async () => {
      const existingCounter = await Counter.findOne({ name: 'userId' });
      if (!existingCounter) {
        await Counter.create({ name: 'userId', seq: 0 }); // Start from 0
        console.log('Counter initialized for userId.');
      }
    };

    await initializeCounter(); // Call the async function after connecting to DB
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
