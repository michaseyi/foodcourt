import env from "dotenv"
env.config()
import { AppDataSource } from "./data-source"
async function main() {
	await AppDataSource.initialize()
	await AppDataSource.synchronize(true)
}
main()
