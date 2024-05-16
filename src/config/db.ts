import mongoose from "mongoose";

const dbConnect = () => mongoose.connect(process.env.DB_URI!)
        .catch((error) => console.log("error connecting to db", error))

export default dbConnect;