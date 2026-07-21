export function split(path: string): { dir: string, filename: string } {
    const lastSlashIdx = Math.max(
        path.lastIndexOf('/'),
        path.lastIndexOf('\\')
    );
    const dir = path.slice(0, lastSlashIdx);
    const filename = path.slice(lastSlashIdx + 1);

    return { dir, filename }
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
