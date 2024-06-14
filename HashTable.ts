import { LinkedList } from './LinkedList';

export class HashTable {
    private capacity: number;
    private _size: number;
    private items: LinkedList[];

    constructor(capacity: number) {
        this.capacity = capacity;
        this.items = Array.from({ length: capacity }, () => new LinkedList());
        this._size = 0;
    }

    private hash(nom: string): number {
        let hash = 0;
        for (let c of nom) {
            hash = (hash * 31 + c.charCodeAt(0)) % this.capacity;
        }
        return hash;
    }

    add(nom: string): void {
        if (!this.contains(nom)) {
            let index = this.hash(nom);
            this.items[index].add(nom);
            this._size++;
        }
    }

    contains(nom: string): boolean {
        let index = this.hash(nom);
        return this.items[index].contains(nom);
    }

    remove(nom: string): void {
        if (this.contains(nom)) {
            let index = this.hash(nom);
            this.items[index].remove(nom);
            this._size--;
        }
    }
    

    getSize(): number {
        return this._size;
    }

    print(): void {
        for (let i = 0; i < this.capacity; i++) {
            console.log(i + ": " + this.items[i].toString());
        }
    }

    getNumLists(): number {
        return this.capacity;
    }

    getList(index: number): LinkedList {
        return this.items[index];
    }
}
