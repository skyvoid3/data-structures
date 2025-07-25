class DoubleListNode<T> {
    value: T;
    next: DoubleListNode<T> | null;
    prev: DoubleListNode<T> | null;

    constructor(
        value: T,
        next: DoubleListNode<T> | null = null,
        prev: DoubleListNode<T> | null = null,
    ) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList<T> {
    private head: DoubleListNode<T> | null;
    private tail: DoubleListNode<T> | null;
    private length: number = 0;

    append(value: T): void {
        const newNode: DoubleListNode<T> = new DoubleListNode(value);

        if (this.head === null) {
            this.head = this.tail = newNode;
            return;
        }

        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        this.length++;
        return;
    }

    prepend(value: T): void {
        const newNode: DoubleListNode<T> = new DoubleListNode(value, this.head);
        if (this.head !== null) {
            this.head.prev = newNode;
        } else {
            this.tail = newNode;
        }
        this.head = newNode;
        this.length--;
        return;
    }

    // Delete all nodes with matching value. (O(n) time)
    deleteAll(value: T): void {
        if (this.head === null) {
            return;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            if (this.head !== null) {
                this.head.prev = null;
            }
            this.length--;
        }

        let current: DoubleListNode<T> | null = this.head;

        while (current !== null) {
            if (current.value === value) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else this.head = current.next;

                if (current.next) {
                    current.next.prev = current.prev;
                } else this.tail = current.prev;

                this.length--;
            }
            current = current.next;
        }
        return;
    }

    search(value: T): DoubleListNode<T> | null {
        if (this.head === null) {
            return null;
        }

        if (this.head.value === value) {
            return this.head;
        }

        let current: DoubleListNode<T> | null = this.head;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }

            current = current.next;
        }

        return null;
    }

    toArray(): T[] {
        const arr: T[] = [];

        let current: DoubleListNode<T> | null = this.head;

        while (current !== null) {
            arr.push(current.value);
            current = current.next;
        }

        return arr;
    }

    printReverse(): void {
        let current = this.tail;

        while (current !== null) {
            console.log(current.value);
            current = current.prev;
        }
    }

    getLength(): number {
        return this.length;
    }

    constructor(value?: T, next: DoubleListNode<T> | null = null) {
        if (value !== undefined && value !== null) {
            this.head = new DoubleListNode(value, next);
            this.tail = this.head;
        } else {
            this.head = null;
            this.tail = null;
        }
    }
}

class SingleListNode<T> {
    value: T;
    next: SingleListNode<T> | null;

    constructor(value: T, next: SingleListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class SinglyLinkedList<T> {
    private head: SingleListNode<T> | null = null;
    private tail: SingleListNode<T> | null = null;
    private length: number = 0;

    // If the linkedList is empty the new node will be assigned to head and tail
    append(value: T): void {
        const newNode = new SingleListNode(value);

        if (!this.head) {
            this.head = this.tail = newNode;
            this.length++;
            return;
        }

        this.tail!.next = newNode;
        this.tail = newNode;
        this.length++;
        return;
    }

    // If the linkedList is empty the new node will be assigned to head and tail
    prepend(value: T): void {
        const newNode = new SingleListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }
    }

    // Deletes all list node with matching value. (O(n) time)
    deleteAll(value: T): void {
        if (!this.head) {
            return;
        }

        // Delete head nodes with matching value
        while (this.head && this.head.value === value) {
            this.head = this.head.next;
            this.length--;
        }

        let current: SingleListNode<T> | null = this.head;

        while (current && current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) {
                    this.tail = current;
                }
                this.length--;
            } else {
                current = current.next;
            }
        }
        return;
    }

    search(value: T): SingleListNode<T> | null {
        let current = this.head;

        while (current) {
            if (current.value === value) return current;
            current = current.next;
        }

        return null;
    }

    toArray(): T[] {
        const arr: T[] = [];
        let current = this.head;

        while (current) {
            arr.push(current.value);
            current = current.next;
        }

        return arr;
    }

    print(): void {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }

    constructor(value?: T, next: SingleListNode<T> | null = null) {
        if (value !== undefined && value !== null) {
            this.head = new SingleListNode(value, next);
            this.tail = this.head;
        } else {
            this.head = null;
            this.tail = null;
        }
    }
}
