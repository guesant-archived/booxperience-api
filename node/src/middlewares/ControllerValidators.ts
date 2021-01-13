import { ControllerBase } from "@/controllers/ControllerBase";
import { IFunctionQueueFn } from "@/types/IFunctionQueueFn";
import { ObjectSchema } from "yup";

export const GenericControllerValidator = <
  ControllerInstance extends ControllerBase
>(
  prop: keyof ControllerInstance,
) => (schema: ObjectSchema): IFunctionQueueFn => {
  return async function (this: ControllerInstance, _, ...args) {
    if (!schema.isValidSync(this[prop])) {
      return await schema.validate(this[prop]).catch(() => {
        this.send(422, {});
      });
    }
    this[prop] = schema.validateSync(this[prop]) as any;
    return await _.call(this, ...args);
  };
};

export const ParamsValidator = GenericControllerValidator("params");
export const QueryValidator = GenericControllerValidator("query");
export const BodyValidator = GenericControllerValidator("body");
