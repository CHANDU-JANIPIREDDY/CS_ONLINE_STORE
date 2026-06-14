import mongoose from "mongoose";
import dns from "dns";

// Node's default DNS resolver (c-ares) refuses the SRV lookup required by
// mongodb+srv:// on some networks (router/hotspot DNS). Point it at reliable
// public DNS servers so the SRV/TXT lookups succeed.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;