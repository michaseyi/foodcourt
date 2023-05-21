import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Product } from "./Product"
import { ProductCategory } from "./ProductCategory"

@Entity()
export class ProductSubCategory extends BaseEntity {
	@Column({ unique: true })
	name: string

	@OneToMany(() => Product, (product) => product.category)
	products?: Product[]

	@ManyToOne(() => ProductCategory, (category) => category.subCategories, { nullable: false })
	category?: ProductCategory

	constructor(name: string, category: ProductCategory) {
		super()
		this.name = name
		this.category = category
	}
}
