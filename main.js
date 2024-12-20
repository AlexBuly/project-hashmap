import { HashMap } from "./hash.js";

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');

console.log(test.get('apple'));
console.log(test.length());
console.log(test.has('apple'));
console.log(test.has('pear'));
console.log(test.getCapacity());
console.log(test.entries());
console.log(test.keys());
console.log(test.values());

console.log(test.remove('apple'));

console.log(test.entries());
console.log(test.keys());
console.log(test.values());
console.log(test.length());
console.log(test.getCapacity());

test.clear();
console.log(test.entries());
console.log(test.keys());
console.log(test.values());
console.log(test.length());
console.log(test.getCapacity());