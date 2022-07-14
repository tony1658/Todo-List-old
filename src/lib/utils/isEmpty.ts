export default function isEmpty(input: string): boolean {
	// Checks for if the input only contains spaces
	const regex = /^\s*$/;
	return regex.test(input) || input.length === 0;
}
