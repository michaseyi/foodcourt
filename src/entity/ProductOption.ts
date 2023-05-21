import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { ProductOptionType } from "../types/Product"
import { BaseEntity } from "./BaseEntity"
import { Product } from "./Product"
import { ProductOptionValue } from "./ProductOptionValue"

@Entity()
export class ProductOption extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column({ type: "enum", enum: Object.values(ProductOptionType) })
	type: ProductOptionType

	@Column()
	isImportant: boolean

	@ManyToOne(() => Product, (product) => product.options, { nullable: false })
	product: Product

	@ManyToMany(() => ProductOptionValue, (productOptionValue) => productOptionValue.productOption, {
		eager: true,
	})
	optionValues?: ProductOptionValue[]

	constructor(type: ProductOptionType, name: string, product: Product, isImportant: boolean) {
		super()
		this.isImportant = isImportant
		this.type = type
		this.name = name
		this.product = product
	}
}
