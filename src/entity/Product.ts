import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Shop } from "./Shop"
import { ProductCategory } from "./ProductCategory"
import { ProductSubCategory } from "./ProductSubCategory"

@Entity()
export class Product extends BaseEntity {
	@Column()
	name: string

	@Column({ type: "decimal", precision: 10, scale: 2, unsigned: true })
	basePrice: number

	@ManyToOne(() => Shop, (shop) => shop.products, { nullable: false })
	shop?: Shop

	@ManyToOne(() => ProductCategory, (category) => category.products, { nullable: false })
	category?: ProductCategory

	@ManyToOne(() => ProductSubCategory, (subCategory) => subCategory.products)
	subCategory?: ProductSubCategory

	constructor(name: string, basePrice: number, shop: Shop, category: ProductCategory) {
		super()
		this.name = name
		this.basePrice = basePrice
		this.shop = shop
		this.category = category
	}
}
