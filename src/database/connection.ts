import { AppDataSource } from "../data-source"

export async function connectToDb() {
	if (AppDataSource.isInitialized) {
		return AppDataSource
	}
	return await AppDataSource.initialize()
}
