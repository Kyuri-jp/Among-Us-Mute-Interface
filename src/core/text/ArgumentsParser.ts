export function ArgumentsParser(content: string, prefix: string, separator: string) {
    if (!content.includes(prefix)) {
        console.warn("the message is not include prefix.")
        return [];
    } 
    const args = content
        .replace(/\s+/g, " ")
        .split(separator)
        .map(item => item.trim());
        args[0] = args[0].slice(prefix.length).toLowerCase();
    return args
}