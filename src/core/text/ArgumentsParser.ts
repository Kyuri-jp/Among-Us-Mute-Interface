export function ArgumentsParser(content: string, prefix: string, separator: string) {
    if (!content.includes(prefix)) {
        console.warn("the message is not include prefix.")
        return [];
    } 
    const args = content.trim().split(separator);
    args[0] = args[0].slice(prefix.length).toLowerCase();
    return args
}