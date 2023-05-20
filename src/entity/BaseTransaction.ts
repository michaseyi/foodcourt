import { BaseEntity } from "./BaseEntity"
import { Column } from "typeorm"
import { TransactionStatus, TransactionType } from "../types/Transaction"

export class BaseTransaction extends BaseEntity {
	@Column({
		type: "enum",
		enum: Object.values(TransactionStatus),
	})
	status: TransactionStatus

	@Column({ type: "decimal", precision: 10, scale: 2 })
	amount: number

	@Column({
		type: "enum",
		enum: Object.values(TransactionType),
	})
	type: TransactionType

	constructor(amount: number, type: TransactionType) {
		super()
		this.amount = amount
		this.type = type
		this.status = TransactionStatus.PENDING
	}
}
