

export const convertToShortName = (name, maxLength = 30) => {
	return name.substring(0, maxLength) + "...";
}
