import BigNumber from "bignumber.js"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Order } from "./Order"
import { Product } from "./Product"
import { ProductOptionValue } from "./ProductOptionValue"
import { bigNumberTransformer } from "./transformers/BigNumberTransformer"

@Entity()
export class OrderItem extends BaseEntity {
	@ManyToOne(() => Order, (order) => order.orderItems)
	order?: Order

	@ManyToOne(() => Product, (product) => product.salesLog, { nullable: false })
	product?: Product

	@Column({ type: "int" })
	quantity: number

	@Column({ type: "decimal", precision: 10, scale: 2, transformer: bigNumberTransformer })
	totalPrice: BigNumber

	@ManyToMany(() => ProductOptionValue, (productOptionValue) => productOptionValue.salesLog)
	@JoinTable()
	productOptionValues?: ProductOptionValue[]

	constructor(order: Order, quantity: number, totalPrice: BigNumber) {
		super()
		this.order = order
		this.quantity = quantity
		this.totalPrice = totalPrice
	}
}
