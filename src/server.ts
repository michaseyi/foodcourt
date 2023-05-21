import BigNumber from "bignumber.js"
import env from "dotenv"
import { writeFileSync } from "fs"
env.config()
import { AppDataSource } from "./data-source"
import { connectToDb } from "./database/connection"
import { User } from "./entity/User"
import { ProductCategoryRepository } from "./repositories/ProductCategoryRepository"
import { ProductOptionRepository } from "./repositories/ProductOptionRepository"
import { ProductOptionValueRepository } from "./repositories/ProductOptionValueRepository"
import { ProudctRepository } from "./repositories/ProductRepository"
import { ShopRepository } from "./repositories/ShopRepository"
import { UserRepository } from "./repositories/UserRepository"
import { ProductOptionType } from "./types/Product"

async function main() {
	await connectToDb()

	const product = await ProudctRepository.findOne(null, "2a09919c-65ce-410a-ad48-b377647dda9a")

	// const productOption = await ProductOptionRepository.create(
	// 	null,
	// 	"Sides",
	// 	ProductOptionType.MULTIPLE,
	// 	product!,
	// 	false
	// )

	// const productOptionValues = await ProductOptionValueRepository.create(null, productOption, [
	// 	{ name: "Smokey Jollof Rice", additionalPrice: new BigNumber(1550) },
	// 	{ name: "Masa", additionalPrice: new BigNumber(150) },
	// 	{ name: "Sweet Potato Fries", additionalPrice: new BigNumber(1450) },
	// 	{ name: "French Fries", additionalPrice: new BigNumber(950) },
	// 	{ name: "Yam Fries", additionalPrice: new BigNumber(900) },
	// 	{ name: "Roasted Plaintain", additionalPrice: new BigNumber(1150) },
	// ])

	writeFileSync("data.json", JSON.stringify(product))
	console.log(product)
}

main()
