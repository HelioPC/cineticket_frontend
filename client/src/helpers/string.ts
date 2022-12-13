// Given a string return the first 6 characters of the string with ... appended to the end.
// If the string is less than 6 characters long return the string as is.
export const truncate = (str: string, length: number = 6) => {
    if (str.length <= length) {
        return str;
    }
    return str.substring(0, length) + '...';
}