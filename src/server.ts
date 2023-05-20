import env from "dotenv"
env.config()
import { connectToDb } from "./database/connection"
import { UserTransactionRepository } from "./repositories/UserTransactionRepository"

async function main() {
	await connectToDb()
	let transactions = await UserTransactionRepository.findMultiple()

	console.log(transactions)
}

main()
