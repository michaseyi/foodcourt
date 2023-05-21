import { StatusCodes } from "http-status-codes"
import { EntityManager } from "typeorm"
import { AppDataSource } from "../data-source"
import { Shop } from "../entity/Shop"
import { ApiError } from "../utilities/ApiError"

export class ShopRepository {
	static source = AppDataSource.getRepository(Shop)

	static getSource(trxManager: EntityManager | null) {
		if (trxManager) {
			return trxManager.getRepository(Shop)
		}
		return this.source
	}

	static async create(
		trxManager: EntityManager | null,
		name: string,
		email: string,
		password: string
	): Promise<Shop> {
		const source = this.getSource(trxManager)

		const shop = new Shop(name, email, password)
		try {
			return await source.save(shop)
		} catch (err) {
			throw new ApiError(
				"An unexpected error occured, please try again",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}

	static async findOne(
		trxManager: EntityManager | null,
		id?: string,
		phoneNumber?: string,
		email?: string
	): Promise<Shop | null> {
		const source = this.getSource(trxManager)
		try {
			if (id) {
				return await source.findOneBy({ id })
			} else if (phoneNumber) {
				return await source.findOneBy({ phoneNumber })
			} else if (email) {
				return await source.findOneBy({ email })
			}
			return null
		} catch (err) {
			throw new ApiError(
				"An unexpected error occured, please try again",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}
}
