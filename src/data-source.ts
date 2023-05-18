import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import DbConfig from "./config/database"

const dbConfig = DbConfig.retrieve()
export const AppDataSource = new DataSource({
	type: "mysql",
	host: dbConfig.dbHost,
	port: dbConfig.dbPort,
	username: dbConfig.dbUser,
	password: dbConfig.dbPassword,
	database: dbConfig.dbName,
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
})
