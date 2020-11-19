import { LinkedNode } from "@/utils/LinkedNode";
import { LinkedList } from "@/utils/LinkedList";
import { IFunctionQueueFn } from "../types/IFunctionQueueFn";

function runNext(
  this: any,
  node: LinkedNode<IFunctionQueueFn>,
  ...runNextArgs: any[]
) {
  if (node.next) {
    return runNode.apply(this, [node.next, ...runNextArgs]);
  }
}

function runNode(
  this: any,
  node: LinkedNode<IFunctionQueueFn>,
  ...runArgs: any[]
): any {
  return node.value.apply(this, [runNext.bind(this, node), ...runArgs]);
}

export class FunctionQueue {
  nodeQueue: LinkedList<IFunctionQueueFn> = new LinkedList();
  constructor(fnArr?: IFunctionQueueFn[]) {
    Array.isArray(fnArr) && this.fromArray(fnArr);
  }
  fromArray(fnArr: IFunctionQueueFn[]) {
    if (Array.isArray(fnArr) && fnArr.length) {
      for (const fn of fnArr.flat(1)) {
        this.next(fn);
      }
    }
    return this;
  }
  next(fn: IFunctionQueueFn) {
    this.nodeQueue.addToTail(fn);
    return this;
  }
  done() {
    const { nodeQueue } = this;
    return function (this: any, ...initialArgs: any[]) {
      if (nodeQueue.head) {
        return runNode.apply(this, [nodeQueue.head, ...initialArgs]);
      }
    };
  }
}
