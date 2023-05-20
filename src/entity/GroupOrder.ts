import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { OrderStatus } from "../types/Order"
import { BaseEntity } from "./BaseEntity"
import { Order } from "./Order"
import { User } from "./User"

@Entity()
export class GroupOrder extends BaseEntity {
	@ManyToOne(() => User, (user) => user.groupOrders, { nullable: false })
	owner?: User

	@OneToMany(() => Order, (order) => order.group)
	orders?: Order[]

	@Column({ type: "enum", enum: Object.values(OrderStatus) })
	orderStatus: OrderStatus

	constructor(user: User) {
		super()
		this.owner = user
		this.orderStatus = OrderStatus.IN_TRANSIT
	}
}
