import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"

@Entity()
export class User extends BaseEntity {
	@PrimaryColumn({ length: 40 })
	id: string

	@Column({ length: 40 })
	firstName: string

	@Column({ length: 40 })
	lastName: string

	@Column({ unique: true, length: 20 })
	phoneNuber: string

	@Column({ nullable: true, unique: true, length: 40 })
	email: string

	@Column({ nullable: true, type: "blob" })
	profilePicture: string

	@Column({ default: 0, type: "decimal", precision: 12, scale: 2, unsigned: true })
	walletBalance: number
}
