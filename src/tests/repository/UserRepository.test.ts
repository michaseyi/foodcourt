import env from "dotenv"
env.config()
import { connectToDb } from "../../database/connection"
import { UserRepository } from "../../repositories/UserRepository"

beforeAll(async () => {
	await connectToDb()
}, 10000000)

afterAll(async () => {
	await (await connectToDb()).destroy()
}, 1000000)

test("Created user should exist in the database", async () => {
	const user = await UserRepository.create(null, "20")

	const fetchedUser = await UserRepository.findOne(null, user.id)

	expect(fetchedUser?.id).toBe(user.id)
})

test("User should be updated in the database", async () => {
	const user = await UserRepository.create(null, "30")

	await UserRepository.update(null, user.id, { firstName: "Michael", lastName: "Adewole" })

	const fetchedUser = await UserRepository.findOne(null, user.id)

	expect("Michael").toBe(fetchedUser?.firstName)
	expect("Adewole").toBe(fetchedUser?.lastName)
})

test("Should not update secured fields", async () => {
	const user = await UserRepository.create(null, "40")

	await UserRepository.update(null, user.id, { phoneNumber: "100" })

	const fetchedUser = await UserRepository.findOne(null, user.id)

	expect("40").toBe(fetchedUser?.phoneNumber)
})
