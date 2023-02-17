import { connect, set } from "mongoose"

async function dbConnect(): Promise<void> {
    const DB_URI = <string>process.env.DB_URI
    set("strictQuery", false)
    await connect(DB_URI)
    console.log(`> MongoDB Connected`);
}

export default dbConnect