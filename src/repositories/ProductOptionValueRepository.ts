import BigNumber from "bignumber.js"
import { StatusCodes } from "http-status-codes"
import { EntityManager } from "typeorm"
import { AppDataSource } from "../data-source"
import { ProductOption } from "../entity/ProductOption"
import { ProductOptionValue } from "../entity/ProductOptionValue"
import { ApiError } from "../utilities/ApiError"

export class ProductOptionValueRepository {
	static source = AppDataSource.getRepository(ProductOptionValue)

	static getSource(trxManager: EntityManager | null) {
		if (trxManager) {
			return trxManager.getRepository(ProductOptionValue)
		}
		return this.source
	}

	static async create(
		trxManager: EntityManager | null,
		productOption: ProductOption,
		values: { name: string; additionalPrice: BigNumber }[]
	) {
		async function create_(trxManager: EntityManager) {
			const source = ProductOptionValueRepository.getSource(trxManager)

			try {
				return await source.save(
					values.map(
						({ name, additionalPrice }) =>
							new ProductOptionValue(name, additionalPrice, productOption)
					)
				)
			} catch (err) {
				throw new ApiError(
					"an unexpected error occured, please try again later",
					StatusCodes.INTERNAL_SERVER_ERROR
				)
			}
		}
		if (trxManager) {
			return await create_(trxManager)
		} else {
			return await AppDataSource.transaction(async (manager) => {
				return await create_(manager)
			})
		}
	}
}
