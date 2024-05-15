import mongoose from "mongoose";

const dbConnect = () => mongoose.connect(process.env.DB_UI!)
        .then(() => console.log('connected'))
        .catch((error) => console.log(error))

export default dbConnect;
