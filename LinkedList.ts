export class LinkedList {
    private head: Node | null = null;
    private size: number = 0;

    add(data: string): void {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    contains(data: string): boolean {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    remove(data: string): void {
        if (this.head === null) {
            return;
        }
        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            if (current.next.data === data) {
                current.next = current.next.next;
                this.size--;
                return;
            }
            current = current.next;
        }
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    getSize(): number {
        return this.size;
    }

    getHead(): Node | null {
        return this.head;
    }

    getNext(node: Node): Node | null {
        return node.next;
    }

    getData(node: Node): string {
        return node.data;
    }

    toString(): string {
        let result = '';
        let current = this.head;
        let first = true;
        while (current !== null) {
            if (!first) {
                result += ',';
            } else {
                first = false;
            }
            result += current.data;
            current = current.next;
        }
        return result;
    }
}

class Node {
    data: string;
    next: Node | null = null;

    constructor(data: string) {
        this.data = data;
    }
}
