import { BigNumber } from "bignumber.js"
import { ValueTransformer } from "typeorm"

export const bigNumberTransformer: ValueTransformer = {
	from(value: string | null): BigNumber | null {
		if (value === null) {
			return value
		}
		return new BigNumber(value)
	},

	to(value: BigNumber | null): string | null {
		if (value === null) {
			return value
		}
		return value.toString()
	},
}
