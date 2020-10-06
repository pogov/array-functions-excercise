function mapFn(array, callback) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (!array[i]) i++;
    const newItem = callback(array[i], i, array);
    newArray.push(newItem);
  }
  return newArray;
}

function filterFn(array, callback) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (!array[i]) i++;
    const isTrue = callback(array[i], i, array);
    if (isTrue) newArray.push(array[i]);
  }

  return newArray;
}

function someFn(array, callback) {
  for (let i = 0; i < array.length; i++) {
    const isTrue = callback(array[i], i, array);
    if (isTrue) return true;
  }
  return false;
}

function everyFn(array, callback) {
  const bool = [];
  for (let i = 0; i < array.length; i++) {
    const isTrue = callback(array[i], i, array);
    bool.push(isTrue);
  }
  return bool.indexOf(false) < 0;
}

function entriesFn(array) {
  let index = 0;
  return {
    [Symbol.iterator]: () => ({
      next() {
        let currentArrayValue = array[index];
        return {
          value: [index++, currentArrayValue],
          done: index > array.length,
        };
      },
    }),
  };
}

function reduceFn(array, callback, initial) {
  let result = initial || 0;
  for (let i = 0; i < array.length; i++) {
    if (!array[i]) i++;
    const current = callback(result, array[i], i, array);
    if (typeof initial !== "object") result = current;
  }
  return result;
}

function reduceRightFn(array, callback, initial) {
  let result = initial || 0;
  for (let i = array.length - 1; i >= 0; i--) {
    if (!array[i]) i--;
    const current = callback(result, array[i], i, array);
    if (typeof initial !== "object") result = current;
  }
  return result;
}
