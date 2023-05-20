import BigNumber from "bignumber.js"
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { OrderItem } from "./OrderItem"
import { ProductOption } from "./ProductOption"
import { bigNumberTransformer } from "./transformers/BigNumberTransformer"

@Entity()
export class ProductOptionValue extends BaseEntity {
	@Column()
	name: string

	@Column({ type: "decimal", precision: 10, scale: 2, transformer: bigNumberTransformer })
	additionalPrice: BigNumber

	@ManyToOne(() => ProductOption, (productOption) => productOption.optionValues, {
		nullable: false,
	})
	productOption: ProductOption

	@ManyToMany(() => OrderItem, (orderItem) => orderItem.productOptionValues)
	salesLog?: OrderItem[]

	constructor(name: string, additionalPrice: BigNumber, productOption: ProductOption) {
		super()
		this.name = name
		this.additionalPrice = additionalPrice
		this.productOption = productOption
	}
}
