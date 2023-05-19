import { BaseEntity } from "./BaseEntity"
import { Column } from "typeorm"
import { TransactionStatus, TransactionType } from "../types/Transactions"

export class BaseTransaction extends BaseEntity {
	@Column({
		type: "enum",
		enum: [
			TransactionStatus.FAILED,
			TransactionStatus.COMPLETED,
			TransactionStatus.CANCELLED,
			TransactionStatus.PENDING,
		],
	})
	status: TransactionStatus

	@Column({ type: "decimal", precision: 10, scale: 2 })
	amount: number

	@Column({
		type: "enum",
		enum: [TransactionType.DEPOSIT, TransactionType.PURCHASE, TransactionType.WITHDRAWAL],
	})
	type: TransactionType

	constructor(amount: number, type: TransactionType) {
		super()
		this.amount = amount
		this.type = type
		this.status = TransactionStatus.PENDING
	}
}
