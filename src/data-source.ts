import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import DbConfig from "./config/database"
import { Product } from "./entity/Product"
import { Shop } from "./entity/Shop"
import { ProductCategory } from "./entity/ProductCategory"
import { ProductSubCategory } from "./entity/ProductSubCategory"
import { UserTransaction } from "./entity/UserTransaction"
import { ShopTransaction } from "./entity/ShopTransaction"

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
	entities: [
		User,
		Product,
		Shop,
		ProductCategory,
		ProductSubCategory,
		UserTransaction,
		ShopTransaction,
	],
	migrations: [],
	subscribers: [],
})
