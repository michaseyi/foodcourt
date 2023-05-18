import { StatusCodes } from "http-status-codes"
export class ApiError extends Error {
	constructor(message: string, public statusCode: StatusCodes) {
		super(message)
	}
}
