import { Column, Entity, ManyToOne } from "typeorm"

import { TransactionType } from "../types/Transactions"
import { BaseTransaction } from "./BaseTransaction"
import { User } from "./User"

@Entity()
export class UserTransaction extends BaseTransaction {
	@ManyToOne(() => User, (user) => user.transactions, { nullable: false })
	user?: User

	constructor(amount: number, type: TransactionType, user: User) {
		super(amount, type)
		this.user = user
	}
}
