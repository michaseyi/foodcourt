import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { randomUUID } from "crypto"

export class BaseEntity {
	@CreateDateColumn({ type: "timestamp" })
	created_at!: Date

	@UpdateDateColumn({ type: "timestamp" })
	updated_at!: Date

	@PrimaryColumn({ length: 50 })
	id: string

	constructor() {
		this.id = randomUUID()
	}
}
