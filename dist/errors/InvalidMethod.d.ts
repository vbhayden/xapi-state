import BaseError from 'jscommons/dist/errors/BaseError';
export default class extends BaseError {
    method: string;
    constructor(method: string);
}
