import BigNumber from "bignumber.js"
import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Product } from "./Product"
import { ProductCategory } from "./ProductCategory"
import { ShopTransaction } from "./ShopTransaction"
import { bigNumberTransformer } from "./transformers/BigNumberTransformer"

@Entity()
export class Shop extends BaseEntity {
	@Column()
	name: string

	@Column({ nullable: true, unique: true })
	instagramHandle?: string

	@Column({ unique: true })
	phoneNumber: string

	@Column()
	password: string

	@Column({ type: "decimal", precision: 10, scale: 2, transformer: bigNumberTransformer })
	walletBalance: BigNumber

	@Column({ unique: true })
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
		this.walletBalance = new BigNumber(0)
	}
}
