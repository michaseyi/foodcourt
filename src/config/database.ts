import * as assert from "assert"

export default class DbConfig {
	private static instance: DbConfig | null = null
	private constructor(
		readonly dbHost: string,
		readonly dbPort: number,
		readonly dbUser: string,
		readonly dbName: string,
		readonly dbPassword: string
	) {}

	static retrieve(): DbConfig {
		if (DbConfig.instance) {
			return DbConfig.instance
		}
		const dbHost = process.env.DB_HOST
		assert(typeof dbHost === "string", "Database host not set")
		const dbPort = +process.env.DB_PORT
		assert(Number.isInteger(dbPort), "Database port not set or not a number")
		const dbUser = process.env.DB_USER
		assert(typeof dbUser === "string", "Database user not set")
		const dbName = process.env.DB_NAME
		assert(typeof dbName === "string", "Database name not set")
		const dbPassword = process.env.DB_PASSWORD
		assert(typeof dbPassword === "string", "Database password not set")

		DbConfig.instance = new DbConfig(dbHost, dbPort, dbUser, dbName, dbPassword)
		return DbConfig.instance
	}
}
