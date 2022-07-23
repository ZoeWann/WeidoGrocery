export class LinkedListNode<T> {
    //@internal
    list: LinkedList<T>;
    //@internal
    next: LinkedListNode<T>;
    //@internal
    prev: LinkedListNode<T>;
    //@internal
    item: T;

    constructor(value: T, list?: LinkedList<T>) {
        this.list = list;
        this.item = value;
    }

    public get Next(): LinkedListNode<T> | undefined {
        return !this.next || this.next == this.list.First ? undefined : this.next;
    }

    public get Prev(): LinkedListNode<T> | undefined {
        return !this.prev || this == this.list.First ? undefined : this.prev;
    }

    public set Value(v: T) {
        this.item = v;
    }

    public get Value(): T {
        return this.item;
    }

    //@internal
    Invalidate() {
        this.list = undefined;
        this.next = undefined;
        this.prev = undefined;
    }

}

export class LinkedList<T> {

    private head: LinkedListNode<T>;

    private count: number = 0;

    private version: number = 0;

    public get Count(): number {
        return this.count;
    }

    public get First(): LinkedListNode<T> | undefined {
        return this.head;
    }

    public get Last(): LinkedListNode<T> | undefined {
        return !this.head ? undefined : this.head.prev;
    }

    /**
     * AddAfter
     */
    public AddAfter(node: LinkedListNode<T>, value: T): LinkedListNode<T> {
        this.ValidateNode(node);
        let result = new LinkedListNode(value, node.list);
        this.InternalInsertNodeBefore(node.next, result);
        return result;
    }

    /**
     * AddNodeAfter
     */
    public AddNodeAfter(node: LinkedListNode<T>, newNode: LinkedListNode<T>): void {
        this.ValidateNode(node);
        this.ValidateNewNode(newNode);
        this.InternalInsertNodeBefore(node.next, newNode);
        newNode.list = this;
    }

    /**
     * AddBefore
     */
    public AddBefore(node: LinkedListNode<T>, value: T): LinkedListNode<T> {
        this.ValidateNode(node);
        let newNode = new LinkedListNode(value, node.list);
        this.InternalInsertNodeBefore(node, newNode);
        if (node == this.head) {
            this.head = newNode;
        }
        return newNode;
    }

    /**
     * AddNodeBefore
     */
    public AddNodeBefore(node: LinkedListNode<T>, newNode: LinkedListNode<T>): void {
        this.ValidateNode(node);
        this.ValidateNewNode(newNode);
        this.InternalInsertNodeBefore(node, newNode);
        newNode.list = this;
        if (node == this.head) {
            this.head = newNode;
        }
    }

    /**
     * AddFirst
     */
    public AddFirst(value: T): LinkedListNode<T> {
        let newNode = new LinkedListNode(value, this);
        if (!this.head) {
            this.InternalInsertNodeToEmptyList(newNode);
        }
        else {
            this.InternalInsertNodeBefore(this.head, newNode);
            this.head = newNode;
        }
        return newNode;
    }

    /**
     * AddNodeFirst
     */
    public AddNodeFirst(node: LinkedListNode<T>) {
        this.ValidateNewNode(node);
        if (!this.head) {
            this.InternalInsertNodeToEmptyList(node);
        }
        else {
            this.InternalInsertNodeBefore(this.head, node);
            this.head = node;
        }
        node.list = this;
    }

    /**
     * AddLast
     */
    public AddLast(value: T): LinkedListNode<T> {
        let newNode = new LinkedListNode(value, this);
        if (!this.head) {
            this.InternalInsertNodeToEmptyList(newNode);
        }
        else {
            this.InternalInsertNodeBefore(this.head, newNode);
        }
        return newNode;
    }

    public AddNodeLast(node: LinkedListNode<T>): void {
        if (!this.head) {
            this.InternalInsertNodeToEmptyList(node);
        }
        else {
            this.InternalInsertNodeBefore(this.head, node);
        }
        node.list = this;
    }

    /**
     * Remove
     */
    public Remove(value: T): boolean {
        let node = this.Find(value);
        if (node) {
            this.InternalRemoveNode(node);
            return true;
        }
        return false;
    }

    /**
     * RemoveNode
     */
    public RemoveNode(node: LinkedListNode<T>) {
        this.ValidateNode(node);
        this.InternalRemoveNode(node);
    }

    /**
     * RemoveFirst
     */
    public RemoveFirst() {
        if (!this.head) {
            throw new Error("LikedList is Empty");
        }
        this.InternalRemoveNode(this.head);
    }

    /**
     * RemoveLast
     */
    public RemoveLast() {
        if (this.head == null) {
            throw new Error("LikedList is Empty");
        }
        this.InternalRemoveNode(this.head.prev);
    }

    /**
     * Clear
     */
    public Clear() {
        let current = this.head;
        while (current) {
            let temp = current;
            current = current.Next;
            temp.Invalidate();
        }
        this.head = undefined;
        this.count = 0;
        this.version++;
    }

    /**
     * Contains
     */
    public Contains(value: T): boolean {
        return !!this.Find(value);
    }

    /**
     * Find
     */
    public Find(value: T): LinkedListNode<T> | undefined {
        let node = this.head;
        if (node) {
            do {
                if (node.Value == value) {
                    return node;
                }
                node = node.next;
            } while (node != this.head);
        }
        return undefined;
    }

    /**
     * FindLast
     */
    public FindLast(value: T): LinkedListNode<T> | undefined {
        if (this.head) {
            let node = this.head.Prev;
            if (node) {
                do {
                    if (node.Value == value) {
                        return node;
                    }
                    node = node.Prev;
                } while (node != this.head.Prev);
            }
        }
        return undefined;
    }

    private ValidateNode(node: LinkedListNode<T>) {
        if (!node) {
            throw new Error("node can not be null or undefined");
        }
        if (node.list != this) {
            throw new Error("node belongs to another list");
        }
    }

    private ValidateNewNode(node: LinkedListNode<T>) {
        if (!node) {
            throw new Error("node can not be null or undefined");
        }
        if (node.list) {
            throw new Error("node is attached");
        }
    }

    private InternalInsertNodeToEmptyList(newNode: LinkedListNode<T>): void {
        newNode.next = newNode;
        newNode.prev = newNode;
        this.head = newNode;
        this.version++;
        this.count++;
    }

    private InternalInsertNodeBefore(node: LinkedListNode<T>, newNode: LinkedListNode<T>): void {
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev.next = newNode;
        node.prev = newNode;
        this.version++;
        this.count++;
    }

    private InternalRemoveNode(node: LinkedListNode<T>) {
        if (node.next == node) {
            if (!(this.count == 1 && this.head == node)) {
                console.log("this should only be true for a list with only one node");
            }
            this.head = null;
        }
        else {
            node.next.prev = node.prev;
            node.prev.next = node.next;
            if (this.head == node) {
                this.head = node.next;
            }
        }
        node.Invalidate();
        this.count--;
        this.version++;
    }

    [Symbol.iterator]() {
        let iterartor = { next: next };
        let current = this.head;
        let version = this.version;
        let list = this;

        function next() {
            if (version != list.version) {
                throw new Error("cannot modify list when interate it");
            }
            if (current) {
                var value = current.Value;
                current = current.Next;
                return { done: false, value: value }
            }
            return { done: true, value: undefined }
        }
        return iterartor;
    }

}