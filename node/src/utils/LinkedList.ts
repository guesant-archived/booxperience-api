import { LinkedNode } from "@/utils/LinkedNode";

export class LinkedList<
  Value extends any = any,
  INode extends LinkedNode = LinkedNode
> {
  head: INode | null = null;
  tail: INode | null = null;
  addToHead(value: Value) {
    const newNode = new LinkedNode(value, this.head, null) as INode;
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
  }
  addToTail(value: Value) {
    const newNode = new LinkedNode(value, null, this.tail) as INode;
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
  }
}
