import BaseError from 'jscommons/dist/errors/BaseError';
export default class extends BaseError {
    path: string[];
    constructor(path: string[]);
}
