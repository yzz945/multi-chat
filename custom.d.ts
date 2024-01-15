declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const value: string;
    export default value;
}

// web worker
declare module '*?worker' {
    const workerConstructor: {
        new (): Worker
    }
    export default workerConstructor
}