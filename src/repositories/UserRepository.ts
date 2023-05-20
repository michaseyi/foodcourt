import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { ApiError } from "../utilities/ApiError"
import { StatusCodes } from "http-status-codes"
import { UserUpdateData, UserUpdateDataFields } from "../dto/User"
import { WalletUpdateType } from "../types/User"
import BigNumber from "bignumber.js"

export class UserRepository {
	static source = AppDataSource.getRepository(User)

	static async create(phoneNumber: string): Promise<User> {
		const user = new User(phoneNumber)
		try {
			return await this.source.save(user)
		} catch (err) {
			throw new ApiError(
				"An unexpected error occured. Pleas try again later.",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}

	static async findOne(id?: string, phoneNumber?: string, email?: string): Promise<User | null> {
		try {
			if (id) {
				return await this.source.findOneBy({ id })
			} else if (phoneNumber) {
				return await this.source.findOneBy({ phoneNumber })
			} else if (email) {
				return await this.source.findOneBy({ email })
			}
		} catch (err) {
			throw new ApiError(
				"An unexpected error occured. Pleas try again later.",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
		return null
	}

	static async update(userId: string, updateObject: UserUpdateData) {
		const user = await this.findOne(userId)

		if (!user) {
			return null
		}
		const fieldsToUpdate: UserUpdateDataFields[] = [
			UserUpdateDataFields.FIRST_NAME,
			UserUpdateDataFields.LAST_NAME,
			UserUpdateDataFields.PROFILE_PICTURE,
		]

		fieldsToUpdate.forEach((field) => {
			const value = updateObject[field]
			if (value) {
				user[field] = value
			}
		})

		return await this.source.save(user)
	}

	static async updateSecureFields(userId: string, updateObject: UserUpdateData) {
		const user = await this.findOne(userId)

		if (!user) {
			return null
		}
		const fieldsToUpdate: UserUpdateDataFields[] = [
			UserUpdateDataFields.EMAIL,
			UserUpdateDataFields.PHONE_NUMBER,
		]

		fieldsToUpdate.forEach((field) => {
			const value = updateObject[field]
			if (value) {
				user[field] = value
			}
		})

		return await this.source.save(user)
	}

	static async updateWallet(userId: string, amount: BigNumber, type: WalletUpdateType) {
		if (amount.isLessThanOrEqualTo(0)) {
			throw new ApiError(`Update amount cannot be zero or less`, StatusCodes.CONFLICT)
		}
		const user = await this.findOne(userId)

		if (!user) {
			return null
		}

		switch (type) {
			case WalletUpdateType.INCREMENT:
				user.walletBalance = user.walletBalance.plus(amount)
				break

			case WalletUpdateType.DECREMENT:
				if (user.walletBalance.isLessThan(amount)) {
					throw new ApiError(`Wallet balance not enough`, StatusCodes.CONFLICT)
				}
				user.walletBalance = user.walletBalance.minus(amount)
		}
		return await this.source.save(user)
	}
}
