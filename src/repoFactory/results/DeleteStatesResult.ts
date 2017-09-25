interface Result {
  readonly states: {
    readonly id: string;
    readonly contentType: string;
    readonly extension: string;
  }[];
}

export default Result;
