import mongoose from 'mongoose';


export const connectMONGODB = async () => {
  try {
    await mongoose.connect(process.env.DB_CODE_URI)
    .then(()=>{
      console.log("Connected to MongoDB");
    })
    .catch((error)=>{
      console.log("Couldn't connect to MongoDB: " + error);
    })
    } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    }
};

export default mongoose;
