import { BaseEntity } from "./BaseEntity"
import { Column } from "typeorm"
import { TransactionStatus, TransactionType } from "../types/Transaction"
import { bigNumberTransformer } from "./transformers/BigNumberTransformer"
import BigNumber from "bignumber.js"

export class BaseTransaction extends BaseEntity {
	@Column({
		type: "enum",
		enum: Object.values(TransactionStatus),
	})
	status: TransactionStatus

	@Column({ type: "decimal", precision: 10, scale: 2, transformer: bigNumberTransformer })
	amount: BigNumber

	@Column({
		type: "enum",
		enum: Object.values(TransactionType),
	})
	type: TransactionType

	constructor(
		amount: BigNumber,
		type: TransactionType,
		status: TransactionStatus = TransactionStatus.PENDING
	) {
		super()
		this.amount = amount
		this.type = type
		this.status = status
	}
}
