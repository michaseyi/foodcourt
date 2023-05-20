import BigNumber from "bignumber.js"
import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm"
import { TransactionType } from "../types/Transaction"
import { BaseTransaction } from "./BaseTransaction"
import { OrderItem } from "./OrderItem"
import { Shop } from "./Shop"

@Entity()
export class ShopTransaction extends BaseTransaction {
	@ManyToOne(() => Shop, (shop) => shop.transactions, { nullable: false })
	shop?: Shop

	@OneToOne(() => OrderItem)
	@JoinColumn()
	order?: OrderItem

	constructor(amount: BigNumber, type: TransactionType, shop: Shop) {
		super(amount, type)
		this.shop = shop
	}
}
