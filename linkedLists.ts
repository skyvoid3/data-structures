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

    append(value: T): void {
        const newNode: DoubleListNode<T> = new DoubleListNode(value);

        if (this.head === null) {
            this.head = this.tail = newNode;
            return;
        }

        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
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
        return;
    }

    delete(value: T): void {
        if (this.head === null) {
            return;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            if (this.head !== null) {
                this.head.prev = null;
            }
            return;
        }

        let current = this.head;

        while (current) {
            if (current.value === value) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else this.head = current.next;

                if (current.next) {
                    current.next.prev = current.prev;
                } else this.tail = current.prev;

                return;
            }
            current = current.next!;
        }
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
        let current = this.head;
        if (!current) return;

        // Go to the tail
        while (current.next !== null) {
            current = current.next;
        }

        // Print in reverse
        while (current !== null) {
            console.log(current.value);
            current = current.prev;
        }
    }

    constructor(value?: T, next?: DoubleListNode<T> | null) {
        if (value !== undefined) {
            this.head = new DoubleListNode(value, next ?? null);
        } else {
            this.head = null;
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

    append(value: T): void {
        const newNode = new SingleListNode(value);

        if (!this.head) {
            this.head = this.tail = newNode;
            return;
        }

        this.tail!.next = newNode;
        this.tail = newNode;
    }

    prepend(value: T): void {
        const newNode = new SingleListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }
    }

    delete(value: T): void {
        if (!this.head) return;

        // Delete head nodes with matching value
        while (this.head && this.head.value === value) {
            this.head = this.head.next;
        }

        let current = this.head;

        while (current && current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) {
                    this.tail = current;
                }
            } else {
                current = current.next;
            }
        }
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
}
