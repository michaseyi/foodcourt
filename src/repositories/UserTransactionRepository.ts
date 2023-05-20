import BigNumber from "bignumber.js"
import { StatusCodes } from "http-status-codes"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { UserTransaction } from "../entity/UserTransaction"
import { TransactionStatus, TransactionType } from "../types/Transaction"
import { ApiError } from "../utilities/ApiError"

export class UserTransactionRepository {
	static source = AppDataSource.getRepository(UserTransaction)

	static async findOne(id: string): Promise<UserTransaction | null> {
		return await this.source.findOne({
			where: { id },
			relations: { user: true },
		})
	}

	static async findMultiple(): Promise<UserTransaction[]> {
		return await this.source.find({
			loadRelationIds: { disableMixedMap: true },
		})
	}

	static async create(
		user: User,
		amount: BigNumber,
		type: TransactionType,
		status?: TransactionStatus
	): Promise<UserTransaction> {
		let transaction

		if (status) {
			transaction = new UserTransaction(amount, type, user, status)
		} else {
			transaction = new UserTransaction(amount, type, user)
		}

		try {
			return await this.source.save(transaction)
		} catch (error) {
			throw new ApiError(
				"An unexpected error occured, please try again",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}

	static async updateStatus(
		id: string,
		status: TransactionStatus
	): Promise<UserTransaction | null> {
		const transaction = await this.findOne(id)

		if (!transaction) {
			return null
		}

		transaction.status = status
		return await this.source.save(transaction)
	}
}
