import BigNumber from "bignumber.js"
import { StatusCodes } from "http-status-codes"
import { EntityManager } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { UserTransaction } from "../entity/UserTransaction"
import { TransactionStatus, TransactionType } from "../types/Transaction"
import { ApiError } from "../utilities/ApiError"

export class UserTransactionRepository {
	static source = AppDataSource.getRepository(UserTransaction)

	static async findOne(
		trxManager: EntityManager | null,
		id: string
	): Promise<UserTransaction | null> {
		let source = this.source
		if (trxManager) {
			source = trxManager.getRepository(UserTransaction)
		}

		return await source.findOne({
			where: { id },
			relations: { user: true },
		})
	}

	static async findMultiple(trxManager: EntityManager | null): Promise<UserTransaction[]> {
		let source = this.source

		if (trxManager) {
			source = trxManager.getRepository(UserTransaction)
		}

		return await source.find({
			loadRelationIds: { disableMixedMap: true },
		})
	}

	static async create(
		trxManager: EntityManager | null,
		user: User,
		amount: BigNumber,
		type: TransactionType,
		status?: TransactionStatus
	): Promise<UserTransaction> {
		let source = this.source

		if (trxManager) {
			source = trxManager.getRepository(UserTransaction)
		}

		let transaction
		if (status) {
			transaction = new UserTransaction(amount, type, user, status)
		} else {
			transaction = new UserTransaction(amount, type, user)
		}

		try {
			return await source.save(transaction)
		} catch (error) {
			throw new ApiError(
				"An unexpected error occured, please try again",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}

	static async updateStatus(
		trxManager: EntityManager | null,
		id: string,
		status: TransactionStatus
	): Promise<UserTransaction | null> {
		let source = this.source

		if (trxManager) {
			source = trxManager.getRepository(UserTransaction)
		}
		const transaction = await this.findOne(trxManager, id)

		if (!transaction) {
			return null
		}

		transaction.status = status
		return await source.save(transaction)

	}
}
