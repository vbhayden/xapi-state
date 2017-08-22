export default interface Model {
    readonly organisation: string;
    readonly lrs_id: string;
    readonly isTrusted: boolean;
    readonly scopes: string[];
}
