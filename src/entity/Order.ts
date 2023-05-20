import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { OrderStatus } from "../types/Order"
import { BaseEntity } from "./BaseEntity"
import { GroupOrder } from "./GroupOrder"
import { OrderItem } from "./OrderItem"
import { User } from "./User"

@Entity()
export class Order extends BaseEntity {
	@ManyToOne(() => GroupOrder, (groupOrder) => groupOrder.orders)
	group?: GroupOrder

	@ManyToOne(() => User, (user) => user.orders, { nullable: false })
	owner?: User

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
	orderItems?: OrderItem[]

	@Column({ type: "decimal", precision: 10, scale: 2, unsigned: true })
	totalPrice: number

	@Column({ type: "enum", enum: Object.values(OrderStatus) })
	orderStatus: OrderStatus

	constructor(user: User, totalPrice: number) {
		super()
		this.owner = user
		this.totalPrice = totalPrice
		this.orderStatus = OrderStatus.IN_TRANSIT
	}
}
