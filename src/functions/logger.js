const makeLogger = (...prefix) => (...args) => console.log(...prefix, ...args);

module.exports = { makeLogger };
