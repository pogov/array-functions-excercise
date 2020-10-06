const numbers = [2, 4, 3, 6, 8, 10];
const names = ["maciej", "stan", "Mały"];

// array.every using reduce function
numbers.reduce((acc, number) => {
  if (number % 2 !== 0) acc = false;
  return acc;
}, true);

names.reduce((acc, name) => {
  if (!name.match(/ma+/gi)) acc = false;
  return acc;
}, true);

// array.some using reduce function
numbers.reduce((acc, number) => {
  if (number > 9) acc = true;
  return acc;
}, false);

names.reduce((acc, name) => {
  if (name === "stan") acc = true;
  return acc;
}, false);

// array.filter using reduce function
numbers.reduce((arr, number) => {
  if (number > 6) arr.push(number);
  return arr;
}, []);

names.reduce((arr, name) => {
  if (name.match(/\w*[A-Z]\w*/g)) arr.push(name);
  return arr;
}, []);

//array.map using reduce function
numbers.reduce((arr, number) => {
  arr.push(number + 2);
  return arr;
}, []);

names.reduce((arr, name) => {
  arr.push(name.toUpperCase());
  return arr;
}, []);
