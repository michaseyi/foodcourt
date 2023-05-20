import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { ApiError } from "../utilities/ApiError"
import { StatusCodes } from "http-status-codes"
import { UserUpdateData, UserUpdateDataFields } from "../dto/User"

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

	static async find(id?: string, phoneNumber?: string, email?: string): Promise<User | null> {
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
		const user = await this.find(userId)

		if (!user) {
			return null
		}
		const fieldsToUpdate: UserUpdateDataFields[] = [
			UserUpdateDataFields.FIRSTNAME,
			UserUpdateDataFields.LASTNAME,
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
}
