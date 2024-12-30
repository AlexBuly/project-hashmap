class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

export class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
       this.capacity = initialCapacity;
       this.loadFactor = loadFactor;
       this.buckets = Array(this.capacity).fill(null).map(() => []);
       this.size = 0;
    };
    
    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
       for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.capacity;
    }

    set(key, value) {
        let hashKey = this.hash(key);
        let buckets = this.buckets[hashKey];
        let newNode = new Node(key, value);

        if (!buckets) {
            this.buckets[hashKey] = newNode;
        } else {
            let current = buckets;
            while (current.next && current.key !== key) {
                current = current.next;
            }
            if (current.key !== key) current.next = newNode;
            else current.value = value;
        }


      buckets.forEach(bucket => {
        if (bucket) {
            let current = bucket;
            while (current) {
                buckets.push([current.key, current.value]);
                current = current.next;
            }
        }
       })

        // if length is greater than load factor, double capacity
        if  (this.size / this.capacity > this.loadFactor) {
            this.doubleCapacity();
            
        }
        this.size++;
    }

    length() {
        return `Keys in hash map: ${this.size}`;
    }

    entries() {
        return this.buckets;
    }

    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
        this.head = null;
    }

    get(key) {
        let hashKey = this.hash(key);
        let bucket = this.buckets[hashKey];

        if (bucket) {
            let current = bucket;
            while (current.key !== key) {
                current = current.next;
            }
            return current ? current.value : null;
        }
        return null;
    }

    keys() {
         let arr = [];

         this.buckets.forEach(bucket => {
            if (bucket) {
                let current = bucket;
                while (current) {
                    arr.push(current.key);
                    current = current.next;
                }
            }
        });
        const arrKeys = arr.filter(key => key !== undefined);
        return `Keys: ${arrKeys}`;
    }

     values() {
        let arr = [];

         this.buckets.forEach(bucket => {
            if (bucket) {
                let current = bucket;
                while (current) {
                    arr.push(current.value);
                    current = current.next;
                }
            }
        });
        const arrVal = arr.filter(val => val !== undefined);
        return `Values: ${arrVal}`;
    }

    remove(key) {
        let hashKey = this.hash(key);
        if (this.buckets[hashKey]) {
            let current = this.buckets[hashKey];
            let prev = null;

            while (current && current.key !== key) {
                prev = current;
                current = current.next;
            }

            if (current) {
                if (prev) {
                    prev.next = current.next;
                } else {
                    this.buckets[hashKey] = null;
                }
                this.size--;
                return true
            }
        }
        return false;
    }


    getCapacity() {
        return  `Current capacity: ${this.capacity}`;
    }

    has(key) {
    let hashed = this.hash(key);
    if (this.buckets[hashed]) {
      let currentNode = this.buckets[hashed];
      while (currentNode.key !== key) {
        currentNode = currentNode.next;
      }
      return currentNode ? true : false;
    }
    return false;
    }

    doubleCapacity() {
        const oldBuckets = this.entries();
        this.capacity *= 2;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0; 
    
        oldBuckets.forEach(([key, value]) => {
            this.set(key, value);
        });
    }
}