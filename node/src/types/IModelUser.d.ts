import { AccountDoc } from "@/mock/generic/GenerateAccountSchema";

export type IUserGeneric = {
  publicInfo: {
    isVerified: boolean;
    name: string;
  };
  publicJSON: () => {
    username: string;
    publicInfo: IUserGeneric["publicInfo"];
  };
};

export type IUserDoc = AccountDoc & IUserGeneric;
