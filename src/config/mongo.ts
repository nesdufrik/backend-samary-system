import { connect, set } from 'mongoose'

async function dbConnect() {
	try {
		const DB_URI = process.env.DB_URI ?? ''
		set('strictQuery', false)
		await connect(DB_URI)
		console.log('> MongoDB Connected')
	} catch (error) {
		console.log(error)
	}
}

export default dbConnect
