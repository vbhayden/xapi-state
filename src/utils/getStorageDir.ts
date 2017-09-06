export interface GetStorageDirOptions {
  subfolder: string;
  lrs_id: string;
}

export default (opts: GetStorageDirOptions) => `${opts.subfolder}/${opts.lrs_id}/state`;
