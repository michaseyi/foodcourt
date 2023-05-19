import { Entity, ManyToOne } from "typeorm"
import { TransactionType } from "../types/Transactions"
import { BaseTransaction } from "./BaseTransaction"
import { Shop } from "./Shop"

@Entity()
export class ShopTransaction extends BaseTransaction {
	@ManyToOne(() => Shop, (shop) => shop.transactions)
	shop: Shop

	constructor(amount: number, type: TransactionType, shop: Shop) {
		super(amount, type)
		this.shop = shop
	}
}
