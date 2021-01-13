export class LinkedNode<Value = any> {
  value: Value;
  next: LinkedNode<Value> | null;
  prev: LinkedNode<Value> | null;
  constructor(
    value: Value,
    next: LinkedNode<Value> | null = null,
    prev: LinkedNode<Value> | null = null,
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
