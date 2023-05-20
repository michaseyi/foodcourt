import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Order } from "./Order"
import { Product } from "./Product"
import { ProductOptionValue } from "./ProductOptionValue"

@Entity()
export class OrderItem extends BaseEntity {
	@ManyToOne(() => Order, (order) => order.orderItems)
	order?: Order

	@ManyToOne(() => Product, (product) => product.salesLog, { nullable: false })
	product?: Product

	@Column({ type: "int" })
	quantity: number

	@Column({ type: "decimal", precision: 10, scale: 2, unsigned: true })
	totalPrice: number

	@ManyToMany(() => ProductOptionValue, (productOptionValue) => productOptionValue.salesLog)
	@JoinTable()
	productOptionValues?: ProductOptionValue[]

	constructor(order: Order, quantity: number, totalPrice: number) {
		super()
		this.order = order
		this.quantity = quantity
		this.totalPrice = totalPrice
	}
}
