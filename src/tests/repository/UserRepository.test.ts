import env from "dotenv"
env.config()
import { connectToDb } from "../../database/connection"
import { UserRepository } from "../../repositories/UserRepository"

test("Created user should exist in the database", async () => {
	const source = await connectToDb()
	const user = await UserRepository.create("11")

	const fetchedUser = await UserRepository.find(user.id)
	source.destroy()
	expect("11").toBe(fetchedUser?.phoneNumber)
})
