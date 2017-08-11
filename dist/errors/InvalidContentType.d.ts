import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    contentType: string | undefined;
    constructor(contentType?: string | undefined);
}
