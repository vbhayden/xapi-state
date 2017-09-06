export interface GetStorageDirOptions {
  readonly subfolder: string;
  readonly lrs_id: string;
}

export default (opts: GetStorageDirOptions) => `${opts.subfolder}/${opts.lrs_id}/state`;
