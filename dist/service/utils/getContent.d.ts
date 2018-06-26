/// <reference types="node" />
export interface Opts {
    readonly stream: NodeJS.ReadableStream;
    readonly contentType: string;
}
export interface Result {
    readonly content: any;
    readonly contentType: string;
}
declare const _default: ({ stream, contentType }: Opts) => Promise<Result>;
export default _default;
