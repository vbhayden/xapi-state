import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    contentType: string;
    constructor(contentType?: string);
}
