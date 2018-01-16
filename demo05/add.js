function add(x, y) {
  return x + y;
}

function add1() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}
module.exports = add;
module.exports = add1;