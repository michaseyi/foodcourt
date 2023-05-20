import BigNumber from "bignumber.js"
import { Entity, Column, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { GroupOrder } from "./GroupOrder"
import { Order } from "./Order"
import { bigNumberTransformer } from "./transformers/BigNumberTransformer"
import { UserTransaction } from "./UserTransaction"

@Entity()
export class User extends BaseEntity {
	@Column({ length: 40, nullable: true })
	firstName?: string

	@Column({ length: 40, nullable: true })
	lastName?: string

	@Column({ unique: true, length: 20 })
	phoneNumber: string

	@Column({ nullable: true, unique: true, length: 40 })
	email?: string

	@Column({ nullable: true, type: "blob" })
	profilePicture?: string

	@Column({ type: "decimal", precision: 10, scale: 2, transformer: bigNumberTransformer })
	walletBalance: BigNumber

	@OneToMany(() => UserTransaction, (transaction) => transaction.user)
	transactions?: UserTransaction[]

	@OneToMany(() => Order, (order) => order.owner)
	orders?: Order[]

	@OneToMany(() => GroupOrder, (groupOrder) => groupOrder.owner)
	groupOrders?: GroupOrder

	constructor(phoneNumber: string) {
		super()
		this.phoneNumber = phoneNumber
		this.walletBalance = new BigNumber(0)
	}
}
