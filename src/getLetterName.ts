const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function getLetterName(index: number): string {
    let result: string = LETTERS.at(index % LETTERS.length) as string;

    if (index >= LETTERS.length) {
        result += `${ Math.floor(index/LETTERS.length)}`;
    }

    return result;
}