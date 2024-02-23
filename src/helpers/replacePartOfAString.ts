export default function replaceSymbol(str: string, symbol: string, newSymbol: string) {
    return str.split(symbol).join(newSymbol);
}
