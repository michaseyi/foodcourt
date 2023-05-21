import { StatusCodes } from "http-status-codes"
import { EntityManager } from "typeorm"
import { AppDataSource } from "../data-source"
import { Product } from "../entity/Product"
import { ProductCategory } from "../entity/ProductCategory"
import { ProductOption } from "../entity/ProductOption"
import { Shop } from "../entity/Shop"
import { ProductOptionType } from "../types/Product"
import { ApiError } from "../utilities/ApiError"

export class ProductOptionRepository {
	static source = AppDataSource.getRepository(ProductOption)

	static getSource(trxManager: EntityManager | null) {
		if (trxManager) {
			return trxManager.getRepository(ProductOption)
		}
		return this.source
	}

	static async create(
		trxManager: EntityManager | null,
		name: string,
		type: ProductOptionType,
		product: Product,
		isImportant: boolean
	) {
		const source = this.getSource(trxManager)

		const productOption = new ProductOption(type, name, product, isImportant)

		try {
			return await source.save(productOption)
		} catch (err) {
			throw new ApiError(
				"an unexpected error occured, please try again later",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}
}
