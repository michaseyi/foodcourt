export enum UserUpdateDataFields {
	FIRSTNAME = "firstName",
	LASTNAME = "lastName",
	EMAIL = "email",
	PHONENUMBER = "phoneNumber",
	PROFILE_PICTURE = "profilePicture",
}
export type UserUpdateData = {
	firstName?: string
	lastName?: string
	email?: string
	phoneNumber?: string
	profilePicture?: string
}
