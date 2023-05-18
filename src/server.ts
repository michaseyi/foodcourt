import * as env from "dotenv"
env.config()
import { AppDataSource } from "./data-source"

async function main() {
	await AppDataSource.initialize()
}
