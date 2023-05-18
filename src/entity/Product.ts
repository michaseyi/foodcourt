import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Brand } from "./Brand"

@Entity()
export class Product extends BaseEntity {
	@PrimaryColumn()
	id: string

	@Column()
	name: string

	@ManyToOne(() => Brand, (brand) => brand.products)
	brand: Brand

	@OneToMany(() => ProductOption, (productOption) => productOption.product)
	options: ProductOption[]
}

@Entity()
export class ProductOption extends BaseEntity {
	@ManyToOne(() => Product, (product) => product.options)
	product: Product

	@PrimaryColumn()
	name: string

	@Column({ type: "decimal", precision: 12, scale: 2, unsigned: true })
	additionalPrice: number
}
