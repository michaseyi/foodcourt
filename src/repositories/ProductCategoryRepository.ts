import { StatusCodes } from "http-status-codes"
import { EntityManager } from "typeorm"
import { AppDataSource } from "../data-source"
import { ProductCategory } from "../entity/ProductCategory"
import { Shop } from "../entity/Shop"
import { ApiError } from "../utilities/ApiError"

export class ProductCategoryRepository {
	static source = AppDataSource.getRepository(ProductCategory)

	static getSource(trxManager: EntityManager | null) {
		if (trxManager) {
			return trxManager.getRepository(ProductCategory)
		}
		return this.source
	}

	static async create(trxManager: EntityManager | null, name: string, shop: Shop) {
		const source = this.getSource(trxManager)

		const productCategory = new ProductCategory(name, shop)

		try {
			return await source.save(productCategory)
		} catch (err) {
			throw new ApiError(
				"an unexpected error occured, please try again later",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}

   
}
