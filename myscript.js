// const message = "hello";

// module.exports = message;

let counter = 0;

module.exports = {
  incrementCounter() {
    counter = counter + 1;
  },
  getCounter() {
    return counter;
  },
};
