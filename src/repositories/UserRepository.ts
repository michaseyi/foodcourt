import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { QueryFailedError } from "typeorm"
import { ApiError } from "../utilities/ApiError"
import { StatusCodes } from "http-status-codes"
import { randomUUID } from "crypto"

export class UserRepository {
	static async create(phoneNumber: string) {
		const user = new User(phoneNumber)
		try {
			return await AppDataSource.getRepository(User).save(user)
		} catch (err) {
			throw new ApiError(
				"An unexpected error occured. Pleas try again later.",
				StatusCodes.INTERNAL_SERVER_ERROR
			)
		}
	}
}
