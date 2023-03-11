function reverse<T>(x: T) {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join('')) as T;
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('') as T;
  }

  // return null;
}

console.log(reverse(1234));
console.log(reverse('hello'));