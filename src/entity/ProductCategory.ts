import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Product } from "./Product"
import { ProductSubCategory } from "./ProductSubCategory"
import { Shop } from "./Shop"

@Entity()
export class ProductCategory extends BaseEntity {
	@Column()
	name: string

	@ManyToOne(() => Shop, (shop) => shop.productCategories, { nullable: false })
	shop?: Shop

	@OneToMany(() => Product, (product) => product.category)
	products?: Product[]

	@OneToMany(() => ProductSubCategory, (subCategory) => subCategory.category)
	subCategories?: ProductSubCategory[]

	constructor(name: string, shop: Shop) {
		super()
		this.name = name
		this.shop = shop
	}
}
