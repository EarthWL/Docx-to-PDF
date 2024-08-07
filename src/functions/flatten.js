const flatten = (arr) => arr.reduce((acc, currentArray) => [...acc, ...currentArray], []);

module.exports = { flatten };
