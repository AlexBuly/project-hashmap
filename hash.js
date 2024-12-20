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
        const hashKey = this.hash(key);
        const bucket = this.buckets[hashKey];

        for (let i = 0; i < bucket.length; i++) {
            if (i < 0 || i >= bucket.length) {
                throw new Error("Trying to access index out of bounds");
            }
            // if key at index 0 exists
            if (bucket[i][0] === key) {
                // set index 1 as value
                bucket[i][1] = value;
                return;
            }
        }
        // push key and value into bucket
        bucket.push([key, value]);
        this.size++;

        // if length is greater than load factor, double capacity
        if  (this.size / this.capacity > this.loadFactor) {
            this.doubleCapacity();
        }
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
    }

    get(key) {
        const hashKey = this.hash(key);
        const bucket = this.buckets[hashKey]

        for (let i = 0; i < bucket.length; i++) {
           if (i < 0 || i >= bucket.length) {
            throw new Error("Trying to access index out of bounds");
           }
           if (bucket[i][0] === key) {
            // get value
            return bucket[i][1];
           }
        }
        return null;
    }

    keys() {
         const buckets = this.buckets;    
         const bucketsArr = buckets.flat().map(array => array[0]);
         return `Keys: ${bucketsArr}`;
     }

     values() {
        const buckets = this.buckets;    
        const bucketsArr = buckets.flat().map(array => array[1]);
        return `Values: ${bucketsArr}`;
    }

    remove(key) {
        const hashKey = this.hash(key);
        const bucket = this.buckets[hashKey];

        const index = bucket.indexOf(key);

        for (let i = 0; i < bucket.length; i++) {
            if (i < 0 || i >= bucket.length) {
             throw new Error("Trying to access index out of bounds");
            }
            if (bucket[i][0] === key) {
                bucket.splice(index, 1);
                this.size--;
                return true;
            }
         }
         return false;
    }


    getCapacity() {
        return  `Current capacity: ${this.capacity}`;
    }

    has(key) {
        const hashKey = this.hash(key);
        const bucket = this.buckets[hashKey];

        for (let i = 0; i < bucket.length; i++) {
            if (i < 0 || i >= bucket.length) {
                throw new Error("Trying to access index out of bounds");
            }
           return `${key} in hash map?: ${bucket[i][0].includes(key)}`;
        }
        return false;
    }

    doubleCapacity() {
        const newCapactiy = this.capacity * 2;
        const newBuckets =  Array(this.capacity).fill(null).map(() => []);

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                const newHash = this.hash(key, newCapactiy);
                newBuckets[newHash].push([key, value]);
            }
        }
        this.capacity = newCapactiy;
        this.buckets = newBuckets;
    }
}