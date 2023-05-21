import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Shop } from "./Shop"
import { ProductCategory } from "./ProductCategory"
import { ProductSubCategory } from "./ProductSubCategory"
import { ProductOption } from "./ProductOption"
import { OrderItem } from "./OrderItem"
import { bigNumberTransformer } from "./transformers/BigNumberTransformer"
import BigNumber from "bignumber.js"

@Entity()
export class Product extends BaseEntity {
	@Column()
	name: string

	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		transformer: bigNumberTransformer,
		unsigned: true,
	})
	basePrice: BigNumber

	@Column({ type: "int", unsigned: true })
	quantity: number

	@ManyToOne(() => Shop, (shop) => shop.products, { nullable: false })
	shop?: Shop

	@ManyToOne(() => ProductCategory, (category) => category.products, { nullable: false })
	category?: ProductCategory

	@ManyToOne(() => ProductSubCategory, (subCategory) => subCategory.products)
	subCategory?: ProductSubCategory

	@OneToMany(() => ProductOption, (productOption) => productOption.product)
	options?: ProductOption[]

	@OneToMany(() => OrderItem, (orderItem) => orderItem.product)
	salesLog?: OrderItem[]

	constructor(
		name: string,
		basePrice: BigNumber,
		shop: Shop,
		category: ProductCategory,
		quantity: number
	) {
		super()
		this.name = name
		this.basePrice = basePrice
		this.shop = shop
		this.quantity = quantity
		this.category = category
	}
}
