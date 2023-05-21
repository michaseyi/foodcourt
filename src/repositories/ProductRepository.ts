import BigNumber from "bignumber.js"
import { StatusCodes } from "http-status-codes"
import { EntityManager } from "typeorm"
import { AppDataSource } from "../data-source"
import { Product } from "../entity/Product"
import { ProductCategory } from "../entity/ProductCategory"
import { Shop } from "../entity/Shop"
import { ApiError } from "../utilities/ApiError"

export class ProudctRepository {
	static source = AppDataSource.getRepository(Product)

	static getSource(trxManager: EntityManager | null) {
		if (trxManager) {
			return trxManager.getRepository(Product)
		}
		return this.source
	}

	static async create(
		trxManager: EntityManager | null,
		name: string,
		basePrice: BigNumber,
		shop: Shop,
		category: ProductCategory,
		quantity: number
	): Promise<Product> {
		const source = this.getSource(trxManager)

		if (basePrice.isLessThanOrEqualTo(0)) {
			throw new ApiError("Product base price has to be greater than zero", StatusCodes.CONFLICT)
		}

		if (quantity < 0) {
			throw new ApiError("Product quantity cannot be less than  zero", StatusCodes.CONFLICT)
		}

		const product = new Product(name, basePrice, shop, category, quantity)

		try {
			return await source.save(product)
		} catch (err) {
			throw new ApiError(
				"An unexpected error occured, please try again",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}

	static async findOne(trxManager: EntityManager | null, id: string): Promise<Product | null> {
		const source = this.getSource(trxManager)

		try {
			return await source.findOne({
				where: { id },
				relations: { category: true, subCategory: true, shop: true, options: true },
			})
		} catch (error) {
			throw new ApiError(
				"An unexpected error occured, please try again",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}
}
