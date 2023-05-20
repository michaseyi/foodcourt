import { Column, Entity, ManyToMany, ManyToOne } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { OrderItem } from "./OrderItem"
import { ProductOption } from "./ProductOption"

@Entity()
export class ProductOptionValue extends BaseEntity {
	@Column()
	name: string

	@Column({ type: "decimal", precision: 10, scale: 2, unsigned: true })
	additionalPrice: number

	@ManyToOne(() => ProductOption, (productOption) => productOption.optionValues, {
		nullable: false,
	})
	productOption: ProductOption

	@ManyToMany(() => OrderItem, (orderItem) => orderItem.productOptionValues)
	salesLog?: OrderItem[]

	constructor(name: string, additionalPrice: number, productOption: ProductOption) {
		super()
		this.name = name
		this.additionalPrice = additionalPrice
		this.productOption = productOption
	}
}
