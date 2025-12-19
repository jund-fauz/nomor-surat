export function toRoman(num: number) {
	const romanValues: any = {
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1,
	}
	let roman = ''
	for (let key in romanValues) {
		while (num >= romanValues[key]) {
			roman += key
			num -= romanValues[key]
		}
	}
	return roman
}
