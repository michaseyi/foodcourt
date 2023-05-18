import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Brand {
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
}
