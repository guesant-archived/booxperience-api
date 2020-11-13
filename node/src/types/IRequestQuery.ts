export type IRequestQuery = {
  [key: string]:
    | undefined
    | string
    | string[]
    | IRequestQuery
    | IRequestQuery[];
};
