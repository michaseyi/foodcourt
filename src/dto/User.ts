export enum UserUpdateDataFields {
	FIRST_NAME = "firstName",
	LAST_NAME = "lastName",
	EMAIL = "email",
	PHONE_NUMBER = "phoneNumber",
	PROFILE_PICTURE = "profilePicture",
}
export type UserUpdateData = {
	firstName?: string
	lastName?: string
	email?: string
	phoneNumber?: string
	profilePicture?: string
}
