export interface Result {
    fileCount: number,
    files: File[],
    hasFreeUploadSlot: boolean,
    lockedFileCount: number,
    queueLength: number,
    uploadSpeed: number,
    username: string,
}

export interface File {
    bitRate: number,
    code: number,
    extension: string,
    filename: string,
    length: number,
    size: number,
    isLocked: boolean,
}

