export const excerpt = (str: string, charCount: number = 36) => str.length > charCount ? str.substr(0, charCount) + "..." : str
