import { ApplyDefault } from "@/utils/apply-default";
import * as yup from "yup";

export const SVisibility = ({
  strict = false,
  defaults = true,
}: { strict?: boolean; defaults?: boolean } = {}) => {
  const isRequired = strict ? "required" : "notRequired";
  const applyDefault = ApplyDefault(defaults);
  return yup
    .object()
    .shape({
      isPrivate: yup.boolean()[isRequired]().default(applyDefault(false)),
      isIndexable: yup.boolean()[isRequired]().default(applyDefault(true)),
      privateAllowedUsers: yup
        .array()
        .of(yup.string())
        [isRequired]()
        .default(applyDefault([])),
      publicBlockedUsers: yup
        .array()
        .of(yup.string())
        [isRequired]()
        .default(applyDefault([])),
    })
    [isRequired]()
    .default(applyDefault({}));
};
