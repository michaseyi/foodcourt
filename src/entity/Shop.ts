import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Product } from "./Product"
import { ProductCategory } from "./ProductCategory"
import { ShopTransaction } from "./ShopTransaction"

@Entity()
export class Shop extends BaseEntity {
	@Column()
	name: string

	@Column({ nullable: true })
	instagramHandle?: string

	@Column()
	phoneNumber: string

	@Column()
	password: string

	@Column()
	email: string

	@OneToMany(() => ProductCategory, (category) => category.shop)
	productCategories?: ProductCategory[]

	@OneToMany(() => Product, (product) => product.shop)
	products?: Product[]

	@OneToMany(() => ShopTransaction, (transaction) => transaction.shop)
	transactions?: ShopTransaction[]

	constructor(name: string, phoneNumber: string, email: string, password: string) {
		super()
		this.name = name
		this.phoneNumber = phoneNumber
		this.email = email
		this.password = password
	}
}
