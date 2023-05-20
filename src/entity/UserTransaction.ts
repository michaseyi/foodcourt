import BigNumber from "bignumber.js"
import { Column, Entity, ManyToOne } from "typeorm"

import { TransactionStatus, TransactionType } from "../types/Transaction"
import { BaseTransaction } from "./BaseTransaction"
import { User } from "./User"

@Entity()
export class UserTransaction extends BaseTransaction {
	@ManyToOne(() => User, (user) => user.transactions, { nullable: false })
	user?: User

	constructor(amount: BigNumber, type: TransactionType, user: User, status?: TransactionStatus) {
		super(amount, type, status)
		this.user = user
	}
}
