import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	PrimaryColumn,
} from "typeorm"

@Entity()
export class User {
	@PrimaryColumn()
	id: string

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column({ unique: true })
	phoneNuber: string

	@Column({ nullable: true, unique: true })
	email: string

	@Column({ nullable: true })
	profilePicture: string

	@Column({ default: 0, type: "double" })
	walletBalance: number

	@ManyToMany(() => User, (user) => user.followings)
	@JoinTable({
		name: "follower_followee",
		joinColumn: {
			name: "followeeId",
			referencedColumnName: "id",
		},

		inverseJoinColumn: {
			name: "followerId",
			referencedColumnName: "id",
		},
	})
	followers: User[] = []

	@ManyToMany(() => User, (user) => user.followers)
	followings: User[] = []

	@ManyToMany(() => User, (user) => user.subscribees)
	@JoinTable({
		name: "subscriber_subscribee",
		joinColumn: {
			name: "subscribeeId",
			referencedColumnName: "id",
		},

		inverseJoinColumn: {
			name: "subscriberId",
			referencedColumnName: "id",
		},
	})
	subscribers: User[] = []

	@ManyToMany(() => User, (user) => user.subscribers)
	subscribees: User[] = []
}
