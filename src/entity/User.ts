import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { UserTransaction } from "./UserTransaction"

@Entity()
export class User extends BaseEntity {
	@Column({ length: 40 })
	firstName?: string

	@Column({ length: 40 })
	lastName?: string

	@Column({ unique: true, length: 20 })
	phoneNumber: string

	@Column({ nullable: true, unique: true, length: 40 })
	email?: string

	@Column({ nullable: true, type: "blob" })
	profilePicture?: string

	@Column({ default: 0, type: "decimal", precision: 10, scale: 2, unsigned: true })
	walletBalance: number

	@OneToMany(() => UserTransaction, (transaction) => transaction.user)
	transactions?: UserTransaction[]

	constructor(phoneNumber: string) {
		super()
		this.phoneNumber = phoneNumber
		this.walletBalance = 0
	}
}
