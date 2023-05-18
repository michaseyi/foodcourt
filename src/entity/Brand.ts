import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Product } from "./Product"

@Entity()
export class Brand extends BaseEntity {
	@PrimaryColumn()
	id: string

	@Column()
	name: string

	@Column()
	instagramHandle: string

	@Column()
	phoneNumber: string

	@Column()
	email: string

	@OneToMany(() => Product, (product) => product.brand)
	products: Product[]
}
