import env from "dotenv"
env.config()
import { connectToDb } from "./database/connection"
import { UserRepository } from "./repositories/UserRepository"
async function main() {
	await connectToDb()
	const user = await UserRepository.update("cd771d27-1033-4499-8d84-0aa2eb7e043f", {
		firstName: "Michael",
		lastName: "Adewole",
	})

	console.log(user)
}

main()
